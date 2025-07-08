from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'imwg_calculator')]

async def get_database() -> AsyncIOMotorDatabase:
    """Get database connection"""
    return db

async def create_indexes():
    """Create database indexes for better performance"""
    
    # Assessments collection indexes
    await db.assessments.create_index("id", unique=True)
    await db.assessments.create_index("patient_id")
    await db.assessments.create_index("physician_name")
    await db.assessments.create_index("created_at")
    await db.assessments.create_index("risk_result")
    await db.assessments.create_index("status")
    
    # Calculations collection indexes
    await db.calculations.create_index("assessment_id")
    await db.calculations.create_index("calculated_at")
    await db.calculations.create_index("risk_result")
    
    # History collection indexes
    await db.assessment_history.create_index("assessment_id")
    await db.assessment_history.create_index("timestamp")
    await db.assessment_history.create_index("action")
    
    print("Database indexes created successfully")

async def init_database():
    """Initialize database with required collections and indexes"""
    
    # Create collections if they don't exist
    collections = await db.list_collection_names()
    
    required_collections = ["assessments", "calculations", "assessment_history"]
    
    for collection_name in required_collections:
        if collection_name not in collections:
            await db.create_collection(collection_name)
            print(f"Created collection: {collection_name}")
    
    # Create indexes
    await create_indexes()
    
    print("Database initialization completed")