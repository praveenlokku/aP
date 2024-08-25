<?php
$servername = "localhost";
$username = "root";
$password = "Bu@#9063808032";
$dbname = "aP";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputEmail = $_POST['email'];
    $inputPassword = $_POST['password'];
    
    // Escape input data
    $inputEmail = $conn->real_escape_string($inputEmail);
    $inputPassword = $conn->real_escape_string($inputPassword);
    
    // Hash the password for security
    $hashedPassword = password_hash($inputPassword, PASSWORD_DEFAULT);
    
    // Check if the email already exists
    $sql = "SELECT * FROM login WHERE email = '$inputEmail'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        echo "Email already registered.";
    } else {
        // Insert new user into the database
        $sql = "INSERT INTO login (email, password) VALUES ('$inputEmail', '$hashedPassword')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Registration successful!";
            header("Location: index.html");
            exit();
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    
    $conn->close();
}
?>
