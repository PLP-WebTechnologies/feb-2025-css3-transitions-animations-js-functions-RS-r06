document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const animatedBox = document.getElementById('animatedBox');
    const triggerBtn = document.getElementById('triggerBtn');
    const savePrefsBtn = document.getElementById('savePrefs');
    const bgColorInput = document.getElementById('bgColor');
    const animationSpeedSelect = document.getElementById('animationSpeed');
    
    // Animation types
    const animationTypes = ['bounce', 'spin', 'pulse'];
    let currentAnimationIndex = 0;
    
    // Load saved preferences
    loadPreferences();
    
    // Trigger animation button click handler
    triggerBtn.addEventListener('click', function() {
        // Remove all animation classes first
        animatedBox.classList.remove(...animationTypes);
        
        // Get the next animation type
        const nextAnimation = animationTypes[currentAnimationIndex];
        
        // Apply the animation class
        animatedBox.classList.add(nextAnimation);
        
        // Apply the speed class from preferences
        const speed = animationSpeedSelect.value;
        animatedBox.classList.add(speed);
        
        // Update index for next animation
        currentAnimationIndex = (currentAnimationIndex + 1) % animationTypes.length;
        
        // Change box color randomly for visual effect
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        animatedBox.style.backgroundColor = randomColor;
    });
    
    // Save preferences button click handler
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            bgColor: bgColorInput.value,
            animationSpeed: animationSpeedSelect.value
        };
        
        // Save to localStorage
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        
        // Apply preferences immediately
        applyPreferences(preferences);
        
        // Show feedback
        alert('Preferences saved!');
    });
    
    // Load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            
            // Set form values
            bgColorInput.value = preferences.bgColor;
            animationSpeedSelect.value = preferences.animationSpeed;
            
            // Apply preferences
            applyPreferences(preferences);
        }
    }
    
    // Apply preferences to the page
    function applyPreferences(preferences) {
        // Apply background color
        document.body.style.backgroundColor = preferences.bgColor;
        
        // If there's an active animation, update its speed
        if (animatedBox.classList.contains('bounce') || 
            animatedBox.classList.contains('spin') || 
            animatedBox.classList.contains('pulse')) {
            
            // Remove all speed classes first
            animatedBox.classList.remove('slow', 'normal', 'fast');
            
            // Add the selected speed
            animatedBox.classList.add(preferences.animationSpeed);
        }
    }
    
    // Bonus: Click on the animated box to stop animation
    animatedBox.addEventListener('click', function() {
        animatedBox.classList.remove(...animationTypes, 'slow', 'normal', 'fast');
    });
});