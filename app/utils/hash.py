from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    print("Password length:", len(password))  # DEBUG
    password = str(password).strip() 
    password = password[:72]  # truncate to bcrypt limit
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)