# When the form is submitted
def forgot_password(email):
    user = find_user_by_email(email)
    if user:
        token = generate_secure_token()
        save_token_in_database(user_id=user.id, token=token, expires_in=15)
        send_password_reset_email(email, token)

# When the user clicks the link in the email
def reset_password(token, new_password):
    if is_token_valid(token):
        user = get_user_by_token(token)
        update_user_password(user.id, new_password)
        invalidate_token(token)
        return "Password successfully reset."
    else:
        return "Invalid or expired token."
