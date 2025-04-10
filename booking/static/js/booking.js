document.addEventListener('DOMContentLoaded', function() {
    // Get all booking cells
    const bookingCells = document.querySelectorAll('.booking-cell:not(.booked)');
    
    // Add click event to empty cells
    bookingCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const room = this.dataset.room;
            const time = this.dataset.time;
            
            // Show booking modal
            showBookingModal(room, time);
        });
    });

    // Date navigation
    const prevDayBtn = document.querySelector('.prev-day');
    const nextDayBtn = document.querySelector('.next-day');
    
    if (prevDayBtn && nextDayBtn) {
        prevDayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentUrl = new URL(window.location.href);
            const date = currentUrl.searchParams.get('date') || new Date().toISOString().split('T')[0];
            const prevDate = new Date(date);
            prevDate.setDate(prevDate.getDate() - 1);
            currentUrl.searchParams.set('date', prevDate.toISOString().split('T')[0]);
            window.location.href = currentUrl.toString();
        });
        
        nextDayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentUrl = new URL(window.location.href);
            const date = currentUrl.searchParams.get('date') || new Date().toISOString().split('T')[0];
            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);
            currentUrl.searchParams.set('date', nextDate.toISOString().split('T')[0]);
            window.location.href = currentUrl.toString();
        });
    }

    // Function to show booking modal
    function showBookingModal(room, time) {
        // You can implement your own modal here
        // For now, we'll just show a confirmation
        if (confirm(`Would you like to book ${room} at ${time}?`)) {
            // Send booking request to server
            fetch('/booking/save/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    room: room,
                    time: time,
                    date: document.querySelector('.current-date').dataset.date
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Refresh the page to show updated bookings
                    window.location.reload();
                } else {
                    alert('Failed to book the room. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        }
    }

    // Helper function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}); 