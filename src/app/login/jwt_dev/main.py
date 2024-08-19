import jwt
import datetime
import secrets

# Generate a random 32-byte hex string
secret_key = secrets.token_hex(32)
print(secret_key)

payload = {
    # user id
    "sub": "1234567890",
    "name": "Admin User",
     # Admin role
    "role": "admin",      
    # Issued now
    "iat": datetime.datetime.now(),
    # Expire in 1 hour
    "exp": datetime.datetime.now() + datetime.timedelta(hours=1)
}

# Generate the token
token = jwt.encode(payload, secret_key, algorithm="HS256")

print("Generated JWT Token:")
print(token)