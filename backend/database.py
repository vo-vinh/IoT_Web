import pymongo
import settings

class Database: 
    def __init__(self):
        self.client = pymongo.MongoClient(settings.MONGO_URI)
        self.db = self.client[settings.DB_NAME]
    
    def insert_one(self, collection, data):
        return self.db[collection].insert_one(data)
    
    def find(self, collection, query):
        return self.db[collection].find(query)
    
    def find_one(self, collection, query):
        return self.db[collection].find_one(query)
    
    def update(self, collection, query, data):
        return self.db[collection].update_one(query,data)
        
    def delete(self, collection, query):
        self.db[collection].delete_one(query)
        
    def delete_many(self, collection, query):
        self.db[collection].delete_many(query)

def get_database():
    return Database()