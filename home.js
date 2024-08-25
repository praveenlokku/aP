document.addEventListener('DOMContentLoaded', () => {
    const startInterviewBtn = document.getElementById('start-interview-btn');

    startInterviewBtn.addEventListener('click', async() => {
        // Request camera access
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            // Create a video element to display the camera stream
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.style.width = '100%'; // Make video take full width of its container
            document.body.appendChild(video);

            // Show the interview questions section
            document.getElementById('interview-questions').style.display = 'block';

            // Optionally hide the start interview section
            document.getElementById('start-interview').style.display = 'none';
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access the camera. Please check your permissions.');
        }
    });
});