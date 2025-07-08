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

def create_assessment(data):
    """Create an assessment with the given data"""
    response = requests.post(f"{BASE_URL}/assessments/", json=data)
    if response.status_code == 200:
        return response.json()['id']
    else:
        print(f"Error creating assessment: {response.text}")
        return None

def calculate_risk(assessment_id):
    """Calculate risk for an assessment"""
    response = requests.post(f"{BASE_URL}/assessments/{assessment_id}/calculate")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error calculating risk: {response.text}")
        return None

def delete_assessment(assessment_id):
    """Delete an assessment"""
    requests.delete(f"{BASE_URL}/assessments/{assessment_id}")

def test_risk_calculation_scenarios():
    """Test all risk calculation scenarios"""
    assessment_ids = []  # Store IDs for cleanup
    
    # Test case 1: Standard risk (all negative)
    print("\n=== Test Case 1: Standard Risk (all negative) ===")
    standard_risk_data = {
        "patient_id": "P12345",
        "patient_name": "John Doe",
        "del17p_tp53": "negative",
        "translocation_combo": "negative",
        "del1p32_1q": "negative",
        "b2m_value": 3.5,
        "creatinine_value": 0.9
    }
    
    assessment_id = create_assessment(standard_risk_data)
    if assessment_id:
        assessment_ids.append(assessment_id)
        result = calculate_risk(assessment_id)
        if result:
            print(f"Risk result: {result['risk_result']}")
            print(f"Total risk factors: {result['total_risk_factors']}")
            print(f"Risk factors: {len(result['risk_factors'])}")
            print(f"Clinical interpretation: {result['clinical_interpretation'][:100]}...")
            print(f"Recommendations: {len(result['recommendations'])} items")
    
    # Test case 2: High risk due to del(17p)/TP53
    print("\n=== Test Case 2: High Risk due to del(17p)/TP53 ===")
    high_risk_data_1 = {
        "patient_id": "P67890",
        "patient_name": "Jane Smith",
        "del17p_tp53": "positive",
        "translocation_combo": "negative",
        "del1p32_1q": "negative",
        "b2m_value": 3.5,
        "creatinine_value": 0.9
    }
    
    assessment_id = create_assessment(high_risk_data_1)
    if assessment_id:
        assessment_ids.append(assessment_id)
        result = calculate_risk(assessment_id)
        if result:
            print(f"Risk result: {result['risk_result']}")
            print(f"Total risk factors: {result['total_risk_factors']}")
            print(f"Risk factors: {len(result['risk_factors'])}")
            print(f"First risk factor: {result['risk_factors'][0]['criterion']}")
    
    # Test case 3: High risk due to translocation combo
    print("\n=== Test Case 3: High Risk due to Translocation Combo ===")
    high_risk_data_2 = {
        "patient_id": "P67891",
        "patient_name": "Bob Johnson",
        "del17p_tp53": "negative",
        "translocation_combo": "positive",
        "del1p32_1q": "negative",
        "b2m_value": 3.5,
        "creatinine_value": 0.9
    }
    
    assessment_id = create_assessment(high_risk_data_2)
    if assessment_id:
        assessment_ids.append(assessment_id)
        result = calculate_risk(assessment_id)
        if result:
            print(f"Risk result: {result['risk_result']}")
            print(f"Total risk factors: {result['total_risk_factors']}")
            print(f"Risk factors: {len(result['risk_factors'])}")
            print(f"First risk factor: {result['risk_factors'][0]['criterion']}")
    
    # Test case 4: High risk due to del(1p32) patterns
    print("\n=== Test Case 4: High Risk due to del(1p32) Patterns ===")
    high_risk_data_3 = {
        "patient_id": "P67892",
        "patient_name": "Alice Brown",
        "del17p_tp53": "negative",
        "translocation_combo": "negative",
        "del1p32_1q": "positive",
        "b2m_value": 3.5,
        "creatinine_value": 0.9
    }
    
    assessment_id = create_assessment(high_risk_data_3)
    if assessment_id:
        assessment_ids.append(assessment_id)
        result = calculate_risk(assessment_id)
        if result:
            print(f"Risk result: {result['risk_result']}")
            print(f"Total risk factors: {result['total_risk_factors']}")
            print(f"Risk factors: {len(result['risk_factors'])}")
            print(f"First risk factor: {result['risk_factors'][0]['criterion']}")
    
    # Test case 5: High risk due to β2M and creatinine
    print("\n=== Test Case 5: High Risk due to β2M and Creatinine ===")
    high_risk_data_4 = {
        "patient_id": "P67893",
        "patient_name": "Charlie Davis",
        "del17p_tp53": "negative",
        "translocation_combo": "negative",
        "del1p32_1q": "negative",
        "b2m_value": 6.0,
        "creatinine_value": 0.8
    }
    
    assessment_id = create_assessment(high_risk_data_4)
    if assessment_id:
        assessment_ids.append(assessment_id)
        result = calculate_risk(assessment_id)
        if result:
            print(f"Risk result: {result['risk_result']}")
            print(f"Total risk factors: {result['total_risk_factors']}")
            print(f"Risk factors: {len(result['risk_factors'])}")
            print(f"First risk factor: {result['risk_factors'][0]['criterion']}")
    
    # Test case 6: High risk with multiple factors
    print("\n=== Test Case 6: High Risk with Multiple Factors ===")
    high_risk_data_5 = {
        "patient_id": "P67894",
        "patient_name": "David Wilson",
        "del17p_tp53": "positive",
        "translocation_combo": "positive",
        "del1p32_1q": "positive",
        "b2m_value": 6.0,
        "creatinine_value": 0.8
    }
    
    assessment_id = create_assessment(high_risk_data_5)
    if assessment_id:
        assessment_ids.append(assessment_id)
        result = calculate_risk(assessment_id)
        if result:
            print(f"Risk result: {result['risk_result']}")
            print(f"Total risk factors: {result['total_risk_factors']}")
            print(f"Risk factors: {len(result['risk_factors'])}")
            for i, factor in enumerate(result['risk_factors']):
                print(f"  Risk factor {i+1}: {factor['criterion']}")
    
    # Clean up
    print("\n=== Cleaning up ===")
    for assessment_id in assessment_ids:
        delete_assessment(assessment_id)
    print(f"Deleted {len(assessment_ids)} assessments")

def test_validation():
    """Test validation for assessment fields"""
    print("\n=== Testing Validation ===")
    
    # Test case 1: Missing required fields
    print("\n--- Test Case 1: Missing Required Fields ---")
    invalid_data_1 = {
        "patient_id": "P12345",
        "patient_name": "John Doe"
        # Missing required fields
    }
    
    response = requests.post(f"{BASE_URL}/assessments/", json=invalid_data_1)
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")
    
    # Test case 2: Invalid del17p_tp53 value
    print("\n--- Test Case 2: Invalid del17p_tp53 Value ---")
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
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")
    
    # Test case 3: Invalid β2M value
    print("\n--- Test Case 3: Invalid β2M Value ---")
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
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")
    
    # Test case 4: β2M without creatinine
    print("\n--- Test Case 4: β2M without Creatinine ---")
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
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")

def main():
    # Allow time for server to be fully up
    print("Waiting for server to be ready...")
    time.sleep(2)
    
    # Test risk calculation scenarios
    test_risk_calculation_scenarios()
    
    # Test validation
    test_validation()

if __name__ == "__main__":
    main()