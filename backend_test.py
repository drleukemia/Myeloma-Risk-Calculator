#!/usr/bin/env python3
import requests
import json
import time
import unittest
import os
import sys
from typing import Dict, Any, List, Optional

# Get the backend URL from the frontend .env file
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.strip().split('=')[1].strip('"\'')
    raise ValueError("Could not find REACT_APP_BACKEND_URL in frontend/.env")

# Base URL for API requests
BASE_URL = f"{get_backend_url()}/api"
print(f"Using backend URL: {BASE_URL}")

# Test the health endpoint directly
try:
    response = requests.get(f"{BASE_URL}/health")
    print(f"Health check response: {response.status_code}")
    print(f"Health check data: {response.json()}")
except Exception as e:
    print(f"Error checking health endpoint: {e}")
    sys.exit(1)

class IMWGRiskCalculatorTests(unittest.TestCase):
    """Test suite for IMWG Risk Calculator API"""
    
    def setUp(self):
        """Set up test case - create test data"""
        self.assessment_ids = []  # Store created assessment IDs for cleanup
    
    def tearDown(self):
        """Clean up after tests - delete created assessments"""
        for assessment_id in self.assessment_ids:
            try:
                requests.delete(f"{BASE_URL}/assessments/{assessment_id}")
            except Exception as e:
                print(f"Error cleaning up assessment {assessment_id}: {e}")
    
    def test_01_health_check(self):
        """Test health check endpoint"""
        response = requests.get(f"{BASE_URL}/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["database"], "connected")
        self.assertIn("timestamp", data)
        
        # Test root endpoint
        response = requests.get(f"{BASE_URL}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("version", data)
    
    def test_02_create_assessment(self):
        """Test creating a new assessment"""
        # Standard risk patient (all negative)
        standard_risk_data = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9,
            "clinical_notes": "Initial assessment",
            "physician_name": "Dr. Smith",
            "institution": "General Hospital"
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=standard_risk_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify response fields
        self.assertIn("id", data)
        self.assertEqual(data["patient_id"], "P12345")
        self.assertEqual(data["patient_name"], "John Doe")
        self.assertEqual(data["del17p_tp53"], "negative")
        self.assertEqual(data["status"], "DRAFT")
        
        # Store ID for cleanup
        self.assessment_ids.append(data["id"])
        
        # High risk patient (all positive)
        high_risk_data = {
            "patient_id": "P67890",
            "patient_name": "Jane Smith",
            "del17p_tp53": "positive",
            "translocation_combo": "positive",
            "del1p32_1q": "positive",
            "b2m_value": 6.0,
            "creatinine_value": 0.8,
            "clinical_notes": "High risk features",
            "physician_name": "Dr. Johnson",
            "institution": "Cancer Center"
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=high_risk_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Store ID for cleanup
        self.assessment_ids.append(data["id"])
    
    def test_03_get_assessment(self):
        """Test retrieving a specific assessment"""
        # First create an assessment
        assessment_data = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=assessment_data)
        self.assertEqual(response.status_code, 200)
        created_data = response.json()
        assessment_id = created_data["id"]
        self.assessment_ids.append(assessment_id)
        
        # Now retrieve it
        response = requests.get(f"{BASE_URL}/assessments/{assessment_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify data matches what we created
        self.assertEqual(data["id"], assessment_id)
        self.assertEqual(data["patient_id"], "P12345")
        self.assertEqual(data["patient_name"], "John Doe")
        
        # Test non-existent assessment
        response = requests.get(f"{BASE_URL}/assessments/nonexistent-id")
        self.assertEqual(response.status_code, 404)
    
    def test_04_update_assessment(self):
        """Test updating an assessment"""
        # First create an assessment
        assessment_data = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=assessment_data)
        self.assertEqual(response.status_code, 200)
        created_data = response.json()
        assessment_id = created_data["id"]
        self.assessment_ids.append(assessment_id)
        
        # Update the assessment
        update_data = {
            "patient_name": "John Smith",
            "del17p_tp53": "positive",
            "clinical_notes": "Updated with new findings"
        }
        
        response = requests.put(f"{BASE_URL}/assessments/{assessment_id}", json=update_data)
        self.assertEqual(response.status_code, 200)
        updated_data = response.json()
        
        # Verify updates were applied
        self.assertEqual(updated_data["patient_name"], "John Smith")
        self.assertEqual(updated_data["del17p_tp53"], "positive")
        self.assertEqual(updated_data["clinical_notes"], "Updated with new findings")
        
        # Original data should be preserved for fields not updated
        self.assertEqual(updated_data["translocation_combo"], "negative")
        self.assertEqual(updated_data["b2m_value"], 3.5)
        
        # Test updating non-existent assessment
        response = requests.put(f"{BASE_URL}/assessments/nonexistent-id", json=update_data)
        self.assertEqual(response.status_code, 404)
    
    def test_05_delete_assessment(self):
        """Test deleting an assessment"""
        # First create an assessment
        assessment_data = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=assessment_data)
        self.assertEqual(response.status_code, 200)
        created_data = response.json()
        assessment_id = created_data["id"]
        
        # Delete the assessment
        response = requests.delete(f"{BASE_URL}/assessments/{assessment_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        
        # Verify it's deleted
        response = requests.get(f"{BASE_URL}/assessments/{assessment_id}")
        self.assertEqual(response.status_code, 404)
        
        # Test deleting non-existent assessment
        response = requests.delete(f"{BASE_URL}/assessments/nonexistent-id")
        self.assertEqual(response.status_code, 404)
    
    def test_06_list_assessments(self):
        """Test listing assessments with filtering"""
        # Create multiple assessments
        assessment_data_1 = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9,
            "physician_name": "Dr. Smith"
        }
        
        assessment_data_2 = {
            "patient_id": "P67890",
            "patient_name": "Jane Smith",
            "del17p_tp53": "positive",
            "translocation_combo": "positive",
            "del1p32_1q": "negative",
            "b2m_value": 6.0,
            "creatinine_value": 0.8,
            "physician_name": "Dr. Johnson"
        }
        
        # Create first assessment
        response = requests.post(f"{BASE_URL}/assessments/", json=assessment_data_1)
        self.assertEqual(response.status_code, 200)
        assessment_id_1 = response.json()["id"]
        self.assessment_ids.append(assessment_id_1)
        
        # Create second assessment
        response = requests.post(f"{BASE_URL}/assessments/", json=assessment_data_2)
        self.assertEqual(response.status_code, 200)
        assessment_id_2 = response.json()["id"]
        self.assessment_ids.append(assessment_id_2)
        
        # Test listing all assessments
        response = requests.get(f"{BASE_URL}/assessments/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 2)
        
        # Test filtering by patient_id
        response = requests.get(f"{BASE_URL}/assessments/?patient_id=P12345")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        for assessment in data:
            self.assertEqual(assessment["patient_id"], "P12345")
        
        # Test filtering by physician_name
        response = requests.get(f"{BASE_URL}/assessments/?physician_name=Smith")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        for assessment in data:
            self.assertIn("Smith", assessment["physician_name"])
        
        # Test pagination
        response = requests.get(f"{BASE_URL}/assessments/?limit=1")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)
    
    def test_07_risk_calculation(self):
        """Test risk calculation for different criteria combinations"""
        
        # Test case 1: Standard risk (all negative)
        standard_risk_data = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=standard_risk_data)
        self.assertEqual(response.status_code, 200)
        assessment_id = response.json()["id"]
        self.assessment_ids.append(assessment_id)
        
        # Calculate risk
        response = requests.post(f"{BASE_URL}/assessments/{assessment_id}/calculate")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify standard risk result
        self.assertEqual(data["risk_result"], "STANDARD_RISK")
        self.assertEqual(data["total_risk_factors"], 0)
        self.assertEqual(len(data["risk_factors"]), 0)
        self.assertIn("clinical_interpretation", data)
        self.assertIn("recommendations", data)
        
        # Test case 2: High risk due to del(17p)/TP53
        high_risk_data_1 = {
            "patient_id": "P67890",
            "patient_name": "Jane Smith",
            "del17p_tp53": "positive",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=high_risk_data_1)
        self.assertEqual(response.status_code, 200)
        assessment_id = response.json()["id"]
        self.assessment_ids.append(assessment_id)
        
        # Calculate risk
        response = requests.post(f"{BASE_URL}/assessments/{assessment_id}/calculate")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify high risk result
        self.assertEqual(data["risk_result"], "HIGH_RISK")
        self.assertEqual(data["total_risk_factors"], 1)
        self.assertEqual(len(data["risk_factors"]), 1)
        self.assertEqual(data["risk_factors"][0]["criterion"], "del(17p) and/or TP53 mutation")
        
        # Test case 3: High risk due to translocation combo
        high_risk_data_2 = {
            "patient_id": "P67891",
            "patient_name": "Bob Johnson",
            "del17p_tp53": "negative",
            "translocation_combo": "positive",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=high_risk_data_2)
        self.assertEqual(response.status_code, 200)
        assessment_id = response.json()["id"]
        self.assessment_ids.append(assessment_id)
        
        # Calculate risk
        response = requests.post(f"{BASE_URL}/assessments/{assessment_id}/calculate")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify high risk result
        self.assertEqual(data["risk_result"], "HIGH_RISK")
        self.assertEqual(data["total_risk_factors"], 1)
        self.assertEqual(data["risk_factors"][0]["criterion"], "High-risk translocation")
        
        # Test case 4: High risk due to del(1p32) patterns
        high_risk_data_3 = {
            "patient_id": "P67892",
            "patient_name": "Alice Brown",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "positive",
            "b2m_value": 3.5,
            "creatinine_value": 0.9
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=high_risk_data_3)
        self.assertEqual(response.status_code, 200)
        assessment_id = response.json()["id"]
        self.assessment_ids.append(assessment_id)
        
        # Calculate risk
        response = requests.post(f"{BASE_URL}/assessments/{assessment_id}/calculate")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify high risk result
        self.assertEqual(data["risk_result"], "HIGH_RISK")
        self.assertEqual(data["total_risk_factors"], 1)
        self.assertEqual(data["risk_factors"][0]["criterion"], "del(1p32) patterns")
        
        # Test case 5: High risk due to β2M and creatinine
        high_risk_data_4 = {
            "patient_id": "P67893",
            "patient_name": "Charlie Davis",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 6.0,
            "creatinine_value": 0.8
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=high_risk_data_4)
        self.assertEqual(response.status_code, 200)
        assessment_id = response.json()["id"]
        self.assessment_ids.append(assessment_id)
        
        # Calculate risk
        response = requests.post(f"{BASE_URL}/assessments/{assessment_id}/calculate")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify high risk result
        self.assertEqual(data["risk_result"], "HIGH_RISK")
        self.assertEqual(data["total_risk_factors"], 1)
        self.assertEqual(data["risk_factors"][0]["criterion"], "High β2-microglobulin with normal creatinine")
        
        # Test case 6: High risk with multiple factors
        high_risk_data_5 = {
            "patient_id": "P67894",
            "patient_name": "David Wilson",
            "del17p_tp53": "positive",
            "translocation_combo": "positive",
            "del1p32_1q": "positive",
            "b2m_value": 6.0,
            "creatinine_value": 0.8
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=high_risk_data_5)
        self.assertEqual(response.status_code, 200)
        assessment_id = response.json()["id"]
        self.assessment_ids.append(assessment_id)
        
        # Calculate risk
        response = requests.post(f"{BASE_URL}/assessments/{assessment_id}/calculate")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify high risk result with multiple factors
        self.assertEqual(data["risk_result"], "HIGH_RISK")
        self.assertEqual(data["total_risk_factors"], 4)
        self.assertEqual(len(data["risk_factors"]), 4)
    
    def test_08_assessment_history(self):
        """Test assessment history tracking"""
        # Create an assessment
        assessment_data = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9,
            "physician_name": "Dr. Smith"
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=assessment_data)
        self.assertEqual(response.status_code, 200)
        assessment_id = response.json()["id"]
        self.assessment_ids.append(assessment_id)
        
        # Update the assessment
        update_data = {
            "patient_name": "John Smith",
            "del17p_tp53": "positive"
        }
        
        response = requests.put(f"{BASE_URL}/assessments/{assessment_id}", json=update_data)
        self.assertEqual(response.status_code, 200)
        
        # Calculate risk
        response = requests.post(f"{BASE_URL}/assessments/{assessment_id}/calculate")
        self.assertEqual(response.status_code, 200)
        
        # Get history
        response = requests.get(f"{BASE_URL}/assessments/{assessment_id}/history")
        self.assertEqual(response.status_code, 200)
        history = response.json()
        
        # Verify history entries
        self.assertIsInstance(history, list)
        self.assertGreaterEqual(len(history), 3)  # created, updated, calculated
        
        # Verify history actions
        actions = [entry["action"] for entry in history]
        self.assertIn("created", actions)
        self.assertIn("updated", actions)
        self.assertIn("calculated", actions)
        
        # Test history for non-existent assessment
        response = requests.get(f"{BASE_URL}/assessments/nonexistent-id/history")
        self.assertEqual(response.status_code, 404)
    
    def test_09_data_validation(self):
        """Test data validation for assessment fields"""
        
        # Test case 1: Missing required fields
        invalid_data_1 = {
            "patient_id": "P12345",
            "patient_name": "John Doe"
            # Missing required fields
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=invalid_data_1)
        self.assertEqual(response.status_code, 400)
        
        # Test case 2: Invalid del17p_tp53 value
        invalid_data_2 = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "invalid",  # Should be 'positive' or 'negative'
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5,
            "creatinine_value": 0.9
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=invalid_data_2)
        self.assertEqual(response.status_code, 400)
        
        # Test case 3: Invalid β2M value
        invalid_data_3 = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 60.0,  # Out of range
            "creatinine_value": 0.9
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=invalid_data_3)
        self.assertEqual(response.status_code, 400)
        
        # Test case 4: β2M without creatinine
        invalid_data_4 = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "b2m_value": 3.5
            # Missing creatinine
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=invalid_data_4)
        self.assertEqual(response.status_code, 400)
        
        # Test case 5: Creatinine without β2M
        invalid_data_5 = {
            "patient_id": "P12345",
            "patient_name": "John Doe",
            "del17p_tp53": "negative",
            "translocation_combo": "negative",
            "del1p32_1q": "negative",
            "creatinine_value": 0.9
            # Missing β2M
        }
        
        response = requests.post(f"{BASE_URL}/assessments/", json=invalid_data_5)
        self.assertEqual(response.status_code, 400)

if __name__ == "__main__":
    # Allow time for server to be fully up
    print("Waiting for server to be ready...")
    time.sleep(2)
    
    # Run the tests
    unittest.main(argv=['first-arg-is-ignored'], exit=False)