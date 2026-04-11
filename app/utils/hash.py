from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ---------------- HASH ----------------
def hash_password(password: str):
    if not password:
        raise ValueError("Password cannot be empty")

    password = str(password).strip()

    # bcrypt limit fix
    password = password[:72]

    return pwd_context.hash(password)


# ---------------- VERIFY ----------------
def verify_password(plain_password: str, hashed_password: str):
    if not plain_password or not hashed_password:
        return False

    plain_password = str(plain_password).strip()
    plain_password = plain_password[:72]

    return pwd_context.verify(plain_password, hashed_password)