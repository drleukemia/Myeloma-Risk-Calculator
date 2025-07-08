#!/usr/bin/env python3
import requests
import json
import time
import sys

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

def test_health_check():
    """Test health check endpoint"""
    print("\n=== Testing Health Check ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    # Test root endpoint
    print("\n=== Testing Root Endpoint ===")
    response = requests.get(f"{BASE_URL}/")
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.json()}")

def test_create_assessment():
    """Test creating a new assessment"""
    print("\n=== Testing Create Assessment ===")
    
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
    print(f"Status code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Assessment created with ID: {data['id']}")
        return data['id']
    else:
        print(f"Error: {response.text}")
        return None

def test_get_assessment(assessment_id):
    """Test retrieving a specific assessment"""
    print(f"\n=== Testing Get Assessment {assessment_id} ===")
    
    response = requests.get(f"{BASE_URL}/assessments/{assessment_id}")
    print(f"Status code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Assessment retrieved: {data['patient_name']}")
    else:
        print(f"Error: {response.text}")

def test_update_assessment(assessment_id):
    """Test updating an assessment"""
    print(f"\n=== Testing Update Assessment {assessment_id} ===")
    
    update_data = {
        "patient_name": "John Smith",
        "del17p_tp53": "positive",
        "clinical_notes": "Updated with new findings"
    }
    
    response = requests.put(f"{BASE_URL}/assessments/{assessment_id}", json=update_data)
    print(f"Status code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Assessment updated: {data['patient_name']}")
    else:
        print(f"Error: {response.text}")

def test_calculate_risk(assessment_id):
    """Test risk calculation"""
    print(f"\n=== Testing Risk Calculation {assessment_id} ===")
    
    response = requests.post(f"{BASE_URL}/assessments/{assessment_id}/calculate")
    print(f"Status code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Risk result: {data['risk_result']}")
        print(f"Total risk factors: {data['total_risk_factors']}")
    else:
        print(f"Error: {response.text}")

def test_get_history(assessment_id):
    """Test getting assessment history"""
    print(f"\n=== Testing Get History {assessment_id} ===")
    
    response = requests.get(f"{BASE_URL}/assessments/{assessment_id}/history")
    print(f"Status code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"History entries: {len(data)}")
        for entry in data:
            print(f"  - {entry['action']} at {entry['timestamp']}")
    else:
        print(f"Error: {response.text}")

def test_list_assessments():
    """Test listing assessments"""
    print("\n=== Testing List Assessments ===")
    
    response = requests.get(f"{BASE_URL}/assessments/")
    print(f"Status code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Total assessments: {len(data)}")
        for assessment in data[:3]:  # Show first 3
            print(f"  - {assessment['id']}: {assessment['patient_name']}")
    else:
        print(f"Error: {response.text}")

def test_delete_assessment(assessment_id):
    """Test deleting an assessment"""
    print(f"\n=== Testing Delete Assessment {assessment_id} ===")
    
    response = requests.delete(f"{BASE_URL}/assessments/{assessment_id}")
    print(f"Status code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {data}")
    else:
        print(f"Error: {response.text}")

def main():
    # Allow time for server to be fully up
    print("Waiting for server to be ready...")
    time.sleep(2)
    
    # Run the tests
    test_health_check()
    
    # Create an assessment and get its ID
    assessment_id = test_create_assessment()
    if assessment_id:
        test_get_assessment(assessment_id)
        test_update_assessment(assessment_id)
        test_calculate_risk(assessment_id)
        test_get_history(assessment_id)
        test_list_assessments()
        test_delete_assessment(assessment_id)
    else:
        print("Failed to create assessment, skipping remaining tests")

if __name__ == "__main__":
    main()