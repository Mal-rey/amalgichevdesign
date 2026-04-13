/* -------------------------------------------- */
/* requestAnimationFrame code for animations */
const delay = (duration) => {
    return new Promise(resolve => {
        let start;

        function animationFrame(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;

            if (elapsed >= duration) {
                resolve();
            } else {
                requestAnimationFrame(animationFrame);
            }
        }

        requestAnimationFrame(animationFrame);
    });
};




/* -------------------------------------------- */
/* Navbar Animation */

// Get the and homebutton and individual navbar buttons do a transform translate transition.
const homeButton = document.getElementById('homeButton');
const menuButtons = document.querySelectorAll('.topNavButton');

// Animated both sliding in once the page loads.
document.addEventListener('DOMContentLoaded', () => {
    homeButton.classList.add('loaded');
    menuButtons.forEach(async (button, idx) => {
        button.classList.add('loaded');
    })
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        homeButton.classList.add('loaded');
        menuButtons.forEach(async (button, idx) => {
        button.classList.add('loaded');
    })
    }
});




/* -------------------------------------------- */
/* Navbar Mobile Animation */

// Get the mobile navbar element itself to do an opacity transition.
const navPageMobile = document.getElementById('navPageMobile');

// Make our mobile navbar appear.
document.addEventListener('DOMContentLoaded', () => {
    navPageMobile.classList.add('loaded');
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        navPageMobile.classList.add('loaded');
    }
});

// Get the sandwich button, the second navbar, it's opaque screen cover, mobile menu buttons, and the exit button.
const navSandwich = document.getElementById('navSandwich');
const mobileSecondNav = document.getElementById('navMobileMenu');
const mobileNavBack = document.getElementById('mobileNavBack');
const mobileMenuButtons = document.querySelectorAll('.topNavButtonMobile');
const mobileMenuExitButton = document.getElementById('mobileNavExitButton');

// Open the second navbar when the sandwich button is clicked.
navSandwich.addEventListener('click', () => {
    mobileSecondNav.classList.add('sandwichClicked');
    mobileNavBack.classList.add('sandwichClicked');
}); 

// Close the second navbar when the opaque screen cover is clicked.
mobileNavBack.addEventListener('click', () => {
    mobileSecondNav.classList.remove('sandwichClicked');
    mobileNavBack.classList.remove('sandwichClicked');
});    

// Close the second navbar when one of the menu buttons is clicked.
mobileMenuButtons.forEach((mobileNavButton) => 
    mobileNavButton.addEventListener('click', () => {
        mobileSecondNav.classList.remove('sandwichClicked');
        mobileNavBack.classList.remove('sandwichClicked');
    })
);

// Close the second navbar when the exit button is clicked.
mobileMenuExitButton.addEventListener('click', () => {
    mobileSecondNav.classList.remove('sandwichClicked');
    mobileNavBack.classList.remove('sandwichClicked');
});    




/* -------------------------------------------- */
/* Header Title Animation */

// Get the gradientColor element itself.
const animatedColor = document.getElementById('animatedColor');

// Get the intro element itself to do an opacity transition.
const intro = document.getElementById('intro');

// Titles that will be shown and animated.
const headerTitlesAnimationWords = [
    'A Front-End Developer', 
    'A Back-End Developer', 
    'A Full-Stack Developer', 
    'A Graphic Designer', 
    'Andrey Malgichev'
];

wordCycle = 0;

// Make our intro appear.
document.addEventListener('DOMContentLoaded', async () => {
    intro.classList.add('loaded');
    await document.fonts.ready;
    await delay(250);
    runHeader();
});

window.addEventListener("pageshow", async (event) => {
    if (event.persisted) {
        intro.classList.add('loaded');
        await document.fonts.ready;
        await delay(250);
        runHeader();
    }
});

// Remove current word out when we start the website.
const headerSpanHasLettersRemoval = async () => {
        animatedColor.innerHTML = animatedColor.innerText.split('').map((letter, idx) => `<span style="display: inline-block; opacity: 1; transform: translateY(0); transition: 0.1s all; transition-delay:${idx * 50}ms;">${letter === ' ' ? '&nbsp;' : letter}</span>`).join('')
        
        await delay(1300);

        const introSpans = animatedColor.querySelectorAll('span');

        introSpans.forEach(span => {
            span.style.transform ='translateY(-30px)';
            span.style.opacity='0';
        })

        await delay(1150);
};

// Sets new current word.
const headerSpanNewLetters = () => {
    if (wordCycle >= headerTitlesAnimationWords.length) {
        wordCycle = 0;
    }
};

// Adds current word in when we finish setting the word.
const headerSpanHasLettersAdd = async () => {
    animatedColor.innerText = `${headerTitlesAnimationWords[wordCycle]}`;
    wordCycle++;
    animatedColor.innerHTML = animatedColor.innerText.split('').map((letter, idx) => `<span style="display: inline-block; opacity: 0; transform: translateY(30px); transition: 0.1s all; transition-delay:${idx * 50}ms;">${letter === ' ' ? '&nbsp;' : letter}</span>`).join('');

    await delay(1300);

    const introSpans = animatedColor.querySelectorAll('span');

    introSpans.forEach(span => {
        span.style.transform ='translateY(0)';
        span.style.opacity='1';
    })

    await delay(1150);
};

// Run the animation
const runHeader = async () => {
    while (true) {
        await headerSpanHasLettersRemoval();
        await headerSpanNewLetters();
        await headerSpanHasLettersAdd();
    }
}




/* -------------------------------------------- */
/* About Image Hover Animation */

// Get the about image hover area as well as all the divs with the images (and set a variable to see if the screen size is mobile).
const aboutImageHoverSection = document.getElementById('aboutImageHover');
const aboutImages = document.querySelectorAll('.aboutImageImage');
const mobileSize = window.matchMedia('(max-width: 991px)');

// Will check if on mobile size or not.
const isMobileOrNot = () => {
    removeAllImagesExceptMain();
    window.removeEventListener('scroll', mobileScroll);
    aboutImageHoverSection.removeEventListener('mouseenter', getRandomImage);
    aboutImageHoverSection.removeEventListener('mouseleave', getOriginalImage);

    if (mobileSize.matches) {
        window.addEventListener('scroll', mobileScroll);
    } else {
        // Change the image to a random one (besides original) on hovering in the about image hover section.
        aboutImageHoverSection.addEventListener('mouseenter', getRandomImage);
        // Change the image back to the original on hovering out of the about image hover section.
        aboutImageHoverSection.addEventListener('mouseleave', getOriginalImage);
    }
}

const getRandomImage = () => {

    let randomImage = Math.floor(Math.random() * aboutImages.length);

    if (randomImage === 0) {
        randomImage += 1;
    }

    aboutImages.forEach((image) => {
        image.classList.remove('currentImage');
    });

    aboutImages[randomImage].classList.add('currentImage');
};

const getOriginalImage = () => {

    aboutImages.forEach((image) => {
        image.classList.remove('currentImage');
    });

    aboutImages[0].classList.add('currentImage');
};

const mobileScroll = () => {
    const triggerMobile = window.innerHeight - 500;
    const aboutImageHoverSectionTop = aboutImageHoverSection.getBoundingClientRect().top;

        if (aboutImageHoverSectionTop < triggerMobile) {
            getRandomImage();
            window.removeEventListener('scroll', mobileScroll);
        } else {
            getOriginalImage();
        }        
}

const removeAllImagesExceptMain = () => {
    aboutImages.forEach((image) => {
        image.classList.remove('currentImage');
    });
    aboutImages[0].classList.add('currentImage');
};

isMobileOrNot();

mobileSize.addEventListener('change', isMobileOrNot);




/* -------------------------------------------- */
/* Experience Animation */

// Get all of the experience content divs so we can animate them.
const experienceContent = document.querySelectorAll('.experienceFlexItem');

// Animate them so that when they reach a certain point on the page, they become fully visible instead of opaque.
const showContent = (sectionContent) => {
    const trigger = window.innerHeight - 350;

    sectionContent.forEach(content => {
        const contentTop = content.getBoundingClientRect().top;
        if (contentTop < trigger) {
            content.classList.add('contentLoaded');
        }
    });
}




/* -------------------------------------------- */
/* Skills Animation */

// Get all the skill content divs to animate.
const skillContent = document.querySelectorAll('.skillsSoftwareItemSizing');

// Add some styles and delay between the content to individually animated a bit slower when you scroll in.
skillContent.forEach((content, idx) => {
    content.style.cssText = `transition-delay:${idx * 150}ms;`;
});




/* -------------------------------------------- */
/* Projects Animation */

// Get all the current projects area themselves as well as the arrow icon and the project buttons that need to work if clicked on.
const projectsAreas = document.querySelectorAll('.projectsItemSizing');
const projectsButtons = document.querySelectorAll('.projectArrow');
const projectOptionsButtons = document.querySelectorAll('.projectsButtons');

// When one of the areas is clicked, we want it to remove prior opened ones, then let the one we clicked on be open.
projectsAreas.forEach((projectArea, idx) => 
    projectArea.addEventListener('click', () => {
        if (!projectArea.classList.contains('projectClicked')) {
            removeProjects();
            removeButtons();
            projectArea.classList.add('projectClicked');
            projectsButtons[idx].classList.add('buttonClicked');
        } else {
            removeProjects();
            removeButtons();
        };
    })
);

const removeProjects = () => {
    projectsAreas.forEach(projectArea => 
        projectArea.classList.remove('projectClicked')
    );
}

const removeButtons = () => {
    projectsButtons.forEach(button =>
        button.classList.remove('buttonClicked')
    );
}

// Handles if any of the buttons are clicked on the project tab so that the project animation doesn't play
const handleButtonClick = (e) => {
    e.stopPropagation();
}

projectOptionsButtons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});




/* -------------------------------------------- */
// Use the showContent function to check all of the experience, skills and projects to animate them in.
const handleContent = () => {
    showContent(experienceContent);
    showContent(skillContent);
    showContent(projectsAreas);
};

window.addEventListener('scroll', () => {
    handleContent();
});

window.addEventListener('load', () => {
    handleContent();
})




/* -------------------------------------------- */
// Reset the url back to main url after reload.
const targetURL = "http://localhost:3000/";

if (window.location.href !== targetURL) {
    window.location.replace(targetURL);
}
