# PostgreSQL Setup Guide

## 🎉 Success! Your PostgreSQL setup is complete!

### What's been set up:
- ✅ PostgreSQL 17 installed and running
- ✅ Database `real_estate_db` created
- ✅ Prisma schema updated for PostgreSQL
- ✅ Database migrations applied
- ✅ Connection tested and working

### Database Connection Details:
- **Host**: localhost
- **Port**: 5432
- **Database**: real_estate_db
- **Username**: postgres
- **Password**: postgres

### Useful Commands:

#### Start/Stop PostgreSQL:
```bash
# Start PostgreSQL
sudo pg_ctlcluster 17 main start

# Stop PostgreSQL
sudo pg_ctlcluster 17 main stop

# Check status
sudo pg_lsclusters
```

#### Database Management:
```bash
# Connect to PostgreSQL as postgres user
sudo -u postgres psql

# Connect to your specific database
sudo -u postgres psql real_estate_db

# List all databases
\l

# List all tables
\dt

# Exit PostgreSQL
\q
```

#### Prisma Commands:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database (careful - deletes all data!)
npx prisma migrate reset

# Open Prisma Studio (GUI for database)
npx prisma studio

# Test database connection
node test-db.js
```

#### Useful SQL Queries:
```sql
-- View all users
SELECT * FROM "User";

-- View all posts
SELECT * FROM "Post";

-- Count total users
SELECT COUNT(*) FROM "User";

-- View posts with user information
SELECT p.title, p.price, u."fullName" 
FROM "Post" p 
JOIN "User" u ON p."userId" = u.id;
```

### Environment Variables:
Your `.env` file contains:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/real_estate_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### Next Steps:
1. **Start your application**: `npm run dev`
2. **Explore your database**: `npx prisma studio`
3. **Create some test data** using your API endpoints
4. **Monitor your database** with the provided SQL queries

### Troubleshooting:
- If PostgreSQL won't start: `sudo pg_ctlcluster 17 main restart`
- If connection fails: Check if PostgreSQL is running with `sudo pg_lsclusters`
- If migrations fail: Try `npx prisma migrate reset` (⚠️ deletes all data)

### Security Notes:
- Change the default password in production
- Use environment variables for sensitive data
- Consider using connection pooling for production

Happy coding with PostgreSQL! 🐘