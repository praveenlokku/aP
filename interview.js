document.addEventListener('DOMContentLoaded', async() => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        const userVideo = document.getElementById('user-video');
        userVideo.srcObject = stream;

        const aiImage = document.getElementById('ai-image');
        aiImage.src = "interviewer.png";

        const toggleUserVideoButton = document.getElementById('toggle-user-video');
        const toggleMuteButton = document.getElementById('toggle-mute');

        let userVideoOn = true;
        let audioOn = true;

        toggleUserVideoButton.addEventListener('click', () => {
            if (userVideoOn) {
                userVideo.srcObject.getTracks().forEach(track => track.stop());
                toggleUserVideoButton.textContent = 'Turn On Video';
            } else {
                navigator.mediaDevices.getUserMedia({
                        video: true
                    })
                    .then(newStream => {
                        userVideo.srcObject = newStream;
                    });
                toggleUserVideoButton.textContent = 'Turn Off Video';
            }
            userVideoOn = !userVideoOn;
        });

        toggleMuteButton.addEventListener('click', () => {
            const audioTracks = userVideo.srcObject.getAudioTracks();
            if (audioOn) {
                audioTracks.forEach(track => track.enabled = false);
                toggleMuteButton.textContent = 'Unmute';
            } else {
                audioTracks.forEach(track => track.enabled = true);
                toggleMuteButton.textContent = 'Mute';
            }
            audioOn = !audioOn;
        });

        let timeLeft = 30 * 60;
        const timerElement = document.getElementById('timer');

        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (timeLeft > 0) {
                timeLeft--;
            } else {
                clearInterval(timerInterval);
                alert('Interview completed.');
                document.getElementById('feedback-form').style.display = 'block';
            }
        };

        const timerInterval = setInterval(updateTimer, 1000);

        document.getElementById('close-feedback-form').addEventListener('click', () => {
            document.getElementById('feedback-form').style.display = 'none';
        });

    } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Unable to access camera and/or microphone. Please check your permissions.');
    }
});