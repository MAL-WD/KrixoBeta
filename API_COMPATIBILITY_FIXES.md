# API Compatibility Fixes

## Summary
Fixed field name mismatches between frontend and backend API to ensure proper communication.

## Issues Fixed

### 1. CreateCommand API (`/CreateCommand`)

**❌ Before (Incorrect):**
```json
{
  "fullname": "name",
  "number": "phone", 
  "flor": "floor",
  "itemtype": "itemType",
  "service": "services",
  "workers": "workers",
  "start": "start",
  "distination": "end",
  "price": "price"  // ❌ Wrong field name
}
```

**✅ After (Fixed):**
```json
{
  "fullname": "name",
  "number": "phone",
  "flor": "floor", 
  "itemtype": "itemType",
  "service": "services",
  "workers": "workers",
  "start": "start",
  "distination": "end",
  "prise": "price",  // ✅ Fixed: "price" -> "prise"
  "isaccepted": "false"  // ✅ Added: missing required field
}
```

### 2. CreateWorker API (`/CreateWorker`)

**❌ Before (Incorrect):**
```json
{
  "fullname": "name",  // ❌ Wrong field name
  "number": "phone",
  "email": "email",
  "password": "password",
  "position": "position", 
  "experience": "experience",
  "message": "message",
  "isaccepted": "isAccepted"
}
```

**✅ After (Fixed):**
```json
{
  "fillname": "name",  // ✅ Fixed: "fullname" -> "fillname"
  "number": "phone",
  "email": "email",
  "password": "password",
  "position": "position",
  "experience": "experience", 
  "message": "message",
  "isaccepted": "isAccepted"  // ✅ Added: missing required field
}
```

## Backend API Specification (Reference)

### CreateCommand
```json
{
  "fullname": "produit 1",
  "number": "01234567",
  "flor": "32", 
  "itemtype": "23",
  "service": "5",
  "workers": "2",
  "start": "bechar",
  "distination": "kenada",
  "prise": "5000",
  "isaccepted": "false"
}
```

### CreateWorker  
```json
{
  "fillname": "nasredine ghellale",
  "number": "01234567",
  "email": "SWILLE7500@gmail.com",
  "password": "azertyué&rezerA1!",
  "position": "azertyué&rezerA1!",
  "experience": "aerzrttyuyuioytrezaa...",
  "message": "eazrertyjhfdfsfgndf",
  "isaccepted": false
}
```

### Registration
```json
{
  "email": "SWILLE7500@gmail.com",
  "password": "azertyué&rezerA1!"
}
```

## Files Modified
- `src/services/api.js` - Fixed field mappings in `createCommand` and `createWorker` functions

## Testing
After these fixes, your frontend should now properly communicate with the backend API. Test the following:

1. **Create Command** - Submit a service request from ContactPage
2. **Create Worker** - Submit a job application from HireUsPage  
3. **Registration** - Register a new user account

The network errors should be resolved if the backend CORS is properly configured. 