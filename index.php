<?php
$servername = "localhost";
$username = "root";
$password = "Bu@#9063808032";
$dbname = "aP";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Escape input to prevent SQL injection
    $username = $conn->real_escape_string($username);
    
    $sql = "SELECT * FROM login WHERE email = '$username'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // If passwords are hashed in the database, use password_verify
        // if the passwords are not hashed, remove the password_verify and use direct comparison as in your original code
        if (password_verify($password, $row['password'])) {
            header("Location: home.html");
            exit();
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with that username.";
    }
    
    $conn->close();
}
?>
