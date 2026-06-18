// FIRST CONTAINER/DIV THREE.JS MANUAL ANIMATION VALUES.

// Animation Phases for the all the camera animations here.
let cameraPhases = {
    phase: 0,
    phases: [
	    {rotationX: -1.1, rotationSpeedX: 0.055, rotationY: 0, rotationSpeedY: 0, rotationZ: 0, rotationSpeedZ: 0, positionX: 0, positionSpeedX: 0, positionY: 2, positionSpeedY: 0.0325, positionZ: 2, positionSpeedZ: 0.05, opacity: 1, opacitySpeed: 0},
		{rotationX: -0.55, rotationSpeedX: 0.055, rotationY: 0, rotationSpeedY: 0, rotationZ: 0, rotationSpeedZ: 0, positionX: 0, positionSpeedX: 0, positionY: 2, positionSpeedY: 0, positionZ: 1.80, positionSpeedZ: 0.02, opacity: 1, opacitySpeed: 0},
		{rotationX: -0.1, rotationSpeedX: 0.055, rotationY: 0, rotationSpeedY: 0, rotationZ: 0, rotationSpeedZ: 0, positionX: 0, positionSpeedX: 0, positionY: 2, positionSpeedY: 0, positionZ: 1.46, positionSpeedZ: 0.034, opacity: 1, opacitySpeed: 0}
    ]
};

let cameraPhasesSecond = {
    phase: 0,
    phases: [
	    {rotationX: 0.015, rotationSpeedX: 0.05075, rotationY: 0.25, rotationSpeedY: 0.0125, rotationZ: 0, rotationSpeedZ: 0, positionX: -0.239, positionSpeedX: 0.01195, positionY: 1.87, positionSpeedY: 0.0065, positionZ: 1.2, positionSpeedZ: 0.013, opacity: 1, opacitySpeed: 0}    
	]
};

// Manual animation phases for the capsule machine.
let capsuleMachinePhases = {
    phase: 0,
    phases: [
	    {scaleY: 12, scaleSpeedY: 0.65, rotationZ: 0.3, rotationSpeedZ: 0.02, positionY: 0.55, positionSpeedY: 0.028},
	    {scaleY: 5, scaleSpeedY: 0.4, rotationZ: 0, rotationSpeedZ: 0.02, positionY: 0, positionSpeedY: 0.028},
	    {scaleY: 10, scaleSpeedY: 0.3, rotationZ: -0.15, rotationSpeedZ: 0.0075, positionY: 0.275, positionSpeedY: 0.01385},
        {scaleY: 6.5, scaleSpeedY: 0.18, rotationZ: 0, rotationSpeedZ: 0.0075, positionY: 0, positionSpeedY: 0.01385},
        {scaleY: 4, scaleSpeedY: 0.13, rotationZ: 0, rotationSpeedZ: 0, positionY: 0, positionSpeedY: 0},
        {scaleY: 14, scaleSpeedY: 0.55, rotationZ: 0, rotationSpeedZ: 0, positionY: 0, positionSpeedY: 0},
        {scaleY: 8, scaleSpeedY: 0.35, rotationZ: 0, rotationSpeedZ: 0, positionY: 0, positionSpeedY: 0}, 
        {scaleY: 10, scaleSpeedY: 0.15, rotationZ: 0, rotationSpeedZ: 0, positionY: 0, positionSpeedY: 0}
    ]
};

// Manual animation phases for the capsules and balls inside the machine (where they will be plopped).
let capsulesPhases = [
    {
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: 0.07700162190398448, positionSpeedX: 6, positionY: 1.182931777221432, positionSpeedY: 6, positionZ: -0.003786936462317447, positionSpeedZ: 6, rotationX: -0.012943307921760567, rotationSpeedX: 6, rotationY: 0.04489012582085278, rotationSpeedY: 6, rotationZ: 0.025231937726781877, rotationSpeedZ: 6}
		]
	},
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: -0.0880833218722649, positionSpeedX: 6, positionY: 1.3648495193919035, positionSpeedY: 6, positionZ: 0.0011595815013370541, positionSpeedZ: 6, rotationX: -0.002005311390316084, rotationSpeedX: 6, rotationY: 0.002051994722493295, rotationSpeedY: 6, rotationZ: 0.13465374982852477, rotationSpeedZ: 6}
	    ]
	},
	{
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: 0.09474988927200312, positionSpeedX: 6, positionY: 1.54, positionSpeedY: 6, positionZ: -0.004838136155882895, positionSpeedZ: 6, rotationX: -0.014331198012403998, rotationSpeedX: 6, rotationY: -0.004165025425326668, rotationSpeedY: 6, rotationZ: 1, rotationSpeedZ: 6}
		]
	},
	{
        phase: 0,
	    phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: -0.15, positionSpeedX: 6, positionY: 1.6, positionSpeedY: 6, positionZ: 0, positionSpeedZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: 0, rotationSpeedY: 6, rotationZ: 2, rotationSpeedZ: 6}
	    ]
	},
	{
        phase: 0,
	    phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: 0.01847247149177471, positionSpeedX: 6, positionY: 1.6611, positionSpeedY: 6, positionZ: -0.2118, positionSpeedZ: 6, rotationX: -0.5, rotationSpeedX: 6, rotationY: -0.6084831913451807, rotationSpeedY: 6, rotationZ: -0.5, rotationSpeedZ: 6}
		]
	},
	{
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: 0.22, positionSpeedX: 6, positionY: 1.7, positionSpeedY: 6, positionZ: 0, positionSpeedZ: 6, rotationX: -0.5, rotationSpeedX: 6, rotationY: 0, rotationSpeedY: 6, rotationZ: 0, rotationSpeedZ: 6}
		]
	},
	{
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: -0.1, positionSpeedX: 6, positionY: 2.3, positionSpeedY: 6, positionZ: 0, positionSpeedZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: 0, rotationSpeedY: 6, rotationZ: -1, rotationSpeedZ: 6}
		]
	},
	{
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: 0.02, positionSpeedX: 6, positionY: 1.7, positionSpeedY: 6, positionZ: 0.1, positionSpeedZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: 0, rotationSpeedY: 6, rotationZ: -1.8, rotationSpeedZ: 6}
		]
	},
    {
        phase: 0,
		phases: [  
            {scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: 0.1, positionSpeedX: 6, positionY: 1.95, positionSpeedY: 6, positionZ: 0, positionSpeedZ: 6, rotationX: -0.2, rotationSpeedX: 6, rotationY: 0, rotationSpeedY: 6, rotationZ: 0, rotationSpeedZ: 6}
	    ]
    },
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: -0.1, positionSpeedX: 6, positionY: 2.13, positionSpeedY: 6, positionZ: 0, positionSpeedZ: 6, rotationX: -2, rotationSpeedX: 6, rotationY: -6, rotationSpeedY: 6, rotationZ: 2, rotationSpeedZ: 6}
	    ]
    },
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: 0.1, positionSpeedX: 6, positionY: 2.2, positionSpeedY: 6, positionZ: 0, positionSpeedZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: -6, rotationSpeedY: 6, rotationZ: 2, rotationSpeedZ: 6}
	    ]
    },
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: 0.4, positionSpeedX: 6, positionY: 2, positionSpeedY: 6, positionZ: 0, positionSpeedZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: 0, rotationSpeedY: 6, rotationZ: -2, rotationSpeedZ: 6}
	    ]
    },
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 6, positionX: 0.2, positionSpeedX: 6, positionY: 2, positionSpeedY: 6, positionZ: 0.2, positionSpeedZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: 0, rotationSpeedY: 6, rotationZ: -2, rotationSpeedZ: 6}
	    ]
    }
];

// Manual animation phases for all the star animations.
let starsPhases = [
    {
        phase: 0,
        phases: [
		    {scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 3, rotationY: 0.5, rotationSpeedY: 3, rotationZ: -1.5, rotationSpeedZ: 3, positionX: -1.5, positionSpeedX: 0.08, positionY: 3.5, positionSpeedY: 0.18, positionZ: -1, positionSpeedZ: 0.1, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 35, scaleSpeedXYZ: 6, rotationX: 0.5, rotationSpeedX: 0, rotationY: 0.5, rotationSpeedY: 0, rotationZ: -0.5, rotationSpeedZ: 0.02, positionX: -2, positionSpeedX: 0.01, positionY: 4, positionSpeedY: 0.01, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 0.025},
			{scaleXYZ: 0, scaleSpeedXYZ: 6, rotationX: 0, rotationSpeedX: 3, rotationY: 0, rotationSpeedY: 3, rotationZ: 0, rotationSpeedZ: 3, positionX: 0, positionSpeedX: 3, positionY: 1.5, positionSpeedY: 3, positionZ: 0.4, positionSpeedZ: 3, opacity: 1, opacitySpeed: 6},
			{scaleXYZ: 35, scaleSpeedXYZ: 1, rotationX: -1, rotationSpeedX: 0.02, rotationY: 0, rotationSpeedY: 3, rotationZ: 0, rotationSpeedZ: 3, positionX: 0, positionSpeedX: 3, positionY: 2, positionSpeedY: 0.01, positionZ: 0.4, positionSpeedZ: 3, opacity: 0, opacitySpeed: 0.025}
        ]
    },
    {
        phase: 0,
	    phases: [
			{scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 3, rotationY: 0.5, rotationSpeedY: 3, rotationZ: -1.5, rotationSpeedZ: 3, positionX: -1.3, positionSpeedX: 0.07, positionY: 3.1, positionSpeedY: 0.16, positionZ: -1, positionSpeedZ: 0.1, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 25, scaleSpeedXYZ: 6, rotationX: 0.5, rotationSpeedX: 0, rotationY: 0.5, rotationSpeedY: 0, rotationZ: -0.5, rotationSpeedZ: 0.02, positionX: -2, positionSpeedX: 0.01, positionY: 3.1, positionSpeedY: 0, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 0.025},
			{scaleXYZ: 0, scaleSpeedXYZ: 6, rotationX: 0, rotationSpeedX: 3, rotationY: 0, rotationSpeedY: 3, rotationZ: 0, rotationSpeedZ: 3, positionX: 0.3, positionSpeedX: 3, positionY: 1.5, positionSpeedY: 3, positionZ: 0.4, positionSpeedZ: 3, opacity: 1, opacitySpeed: 6},
		    {scaleXYZ: 25, scaleSpeedXYZ: 1, rotationX: -1, rotationSpeedX: 0.02, rotationY: 0, rotationSpeedY: 3, rotationZ: -0.5, rotationSpeedZ: 0.02, positionX: 0.7, positionSpeedX: 0.01, positionY: 2, positionSpeedY: 0.01, positionZ: 0.4, positionSpeedZ: 0, opacity: 0, opacitySpeed: 0.025}
	    ]
    },
    {
		phase: 0,
		phases: [
			{scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 3, rotationY: 0.5, rotationSpeedY: 3, rotationZ: -1.5, rotationSpeedZ: 3, positionX: -1.61, positionSpeedX: 0.081, positionY: 2.7, positionSpeedY: 0.14, positionZ: -1, positionSpeedZ: 0.1, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 35, scaleSpeedXYZ: 6, rotationX: 0.5, rotationSpeedX: 0, rotationY: 0.5, rotationSpeedY: 0, rotationZ: -0.5, rotationSpeedZ: 0.02, positionX: -2, positionSpeedX: 0.01, positionY: 2, positionSpeedY: 0.01, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 0.025},
			{scaleXYZ: 0, scaleSpeedXYZ: 6, rotationX: 0, rotationSpeedX: 3, rotationY: 0, rotationSpeedY: 3, rotationZ: 0, rotationSpeedZ: 3, positionX: -0.3, positionSpeedX: 3, positionY: 1.5, positionSpeedY: 3, positionZ: 0.4, positionSpeedZ: 3, opacity: 1, opacitySpeed: 6},
			{scaleXYZ: 35, scaleSpeedXYZ: 1, rotationX: -1, rotationSpeedX: 0.02, rotationY: 0, rotationSpeedY: 0.02, rotationZ: -0.5, rotationSpeedZ: 0.02, positionX: -0.7, positionSpeedX: 0.01, positionY: 2, positionSpeedY: 0.01, positionZ: 0.4, positionSpeedZ: 0, opacity: 0, opacitySpeed: 0.025}
		]
	},
	{
		phase: 0,
		phases: [
			{scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 3, rotationY: -0.5, rotationSpeedY: 3, rotationZ: -0.5, rotationSpeedZ: 3, positionX: 1, positionSpeedX: 3, positionY: 2.55, positionSpeedY: 3, positionZ: -1, positionSpeedZ: 0.01665, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 25, scaleSpeedXYZ: 6, rotationX: 0.5, rotationSpeedX: 0, rotationY: -0.5, rotationSpeedY: 0, rotationZ: -1.5, rotationSpeedZ: 0.02, positionX: 1.6, positionSpeedX: 0.01, positionY: 3, positionSpeedY: 0.01, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 0.025},
		]
    },
	{
		phase: 0,
		phases: [
		    {scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 3, rotationY: -0.5, rotationSpeedY: 3, rotationZ: -0.5, rotationSpeedZ: 3, positionX: .80, positionSpeedX: 3, positionY: 2.25, positionSpeedY: 3, positionZ: -1, positionSpeedZ: 0.01665, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 15, scaleSpeedXYZ: 6, rotationX: 0.5, rotationSpeedX: 0, rotationY: -0.5, rotationSpeedY: 0, rotationZ: -1.5, rotationSpeedZ: 0.02, positionX: 1.6, positionSpeedX: 0.01, positionY: 2.25, positionSpeedY: 0, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 0.025},
		]
	},
	{
		phase: 0,
		phases: [
			{scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 3, rotationY: -0.5, rotationSpeedY: 3, rotationZ: -0.5, rotationSpeedZ: 3, positionX: 1.07, positionSpeedX: 3, positionY: 1.95, positionSpeedY: 3, positionZ: -1, positionSpeedZ: 0.01665, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 25, scaleSpeedXYZ: 6, rotationX: 0.5, rotationSpeedX: 0, rotationY: -0.5, rotationSpeedY: 0, rotationZ: -1.5, rotationSpeedZ: 0.02, positionX: 1.6, positionSpeedX: 0.01, positionY: 1.5, positionSpeedY: 0.01, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 0.025},
		]
	},
];

let starsSecondUsePhases = [
	{
		phase: 0,
		phases: [
			{scaleXYZ: 12, scaleSpeedXYZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: -0.3, rotationSpeedY: 6, rotationZ: 0, rotationSpeedZ: 6, positionX: -0.58, positionSpeedX: 6, positionY: 1.7, positionSpeedY: 6, positionZ: 0.13, positionSpeedZ: 6, opacity: 1, opacitySpeed: 0},
		]
	},
	{
		phase: 0,
		phases: [
		    {scaleXYZ: 25, scaleSpeedXYZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: -0.3, rotationSpeedY: 6, rotationZ: 0, rotationSpeedZ: 6, positionX: -0.58, positionSpeedX: 6, positionY: 2, positionSpeedY: 6, positionZ: 0.13, positionSpeedZ: 6, opacity: 1, opacitySpeed: 0},
		]
    },
	{
	    phase: 0,
		phases: [
			{scaleXYZ: 16, scaleSpeedXYZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: -0.3, rotationSpeedY: 6, rotationZ: 0, rotationSpeedZ: 6, positionX: -0.73, positionSpeedX: 6, positionY: 1.8, positionSpeedY: 6, positionZ: 0.13, positionSpeedZ: 6, opacity: 1, opacitySpeed: 0},
	    ]
	},
	{
		phase: 0,
		phases: [
			{scaleXYZ: 12, scaleSpeedXYZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: 0.3, rotationSpeedY: 6, rotationZ: 0, rotationSpeedZ: 6, positionX: 0.58, positionSpeedX: 6, positionY: 1.7, positionSpeedY: 6, positionZ: 0.13, positionSpeedZ: 6, opacity: 1, opacitySpeed: 0},
		]
	},
	{
	    phase: 0,
		phases: [
			{scaleXYZ: 25, scaleSpeedXYZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: 0.3, rotationSpeedY: 6, rotationZ: 0, rotationSpeedZ: 6, positionX: 0.58, positionSpeedX: 6, positionY: 2, positionSpeedY: 6, positionZ: 0.13, positionSpeedZ: 6, opacity: 1, opacitySpeed: 0},
		]
    },
	{
		phase: 0,
		phases: [
			{scaleXYZ: 16, scaleSpeedXYZ: 6, rotationX: 0, rotationSpeedX: 6, rotationY: 0.3, rotationSpeedY: 6, rotationZ: 0, rotationSpeedZ: 6, positionX: 0.73, positionSpeedX: 6, positionY: 1.8, positionSpeedY: 6, positionZ: 0.13, positionSpeedZ: 6, opacity: 1, opacitySpeed: 0},
		]
	}
];

export { cameraPhases, cameraPhasesSecond, capsuleMachinePhases, capsulesPhases, starsPhases, starsSecondUsePhases };