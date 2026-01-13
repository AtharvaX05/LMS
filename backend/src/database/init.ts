// Mock database initialization
// No need for PostgreSQL - data stored in memory

const initializeDatabase = async () => {
  try {
    console.log('✅ Mock database initialized successfully');
    console.log('📝 Note: Data is stored in memory and will be lost on server restart');
    console.log('💡 For production, replace mockDb with real PostgreSQL');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export default initializeDatabase;
