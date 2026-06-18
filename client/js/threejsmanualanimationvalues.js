// FIRST CONTAINER/DIV THREE.JS MANUAL ANIMATION VALUES.

// Animation Phases for the all the camera animations here.
let cameraPhases = {
    phase: 0,
    phases: [
	    {rotationX: -1.1, rotationSpeedX: 2.2, rotationY: 0, rotationSpeedY: 0, rotationZ: 0, rotationSpeedZ: 0, positionX: 0, positionSpeedX: 0, positionY: 2, positionSpeedY: 1.3, positionZ: 2, positionSpeedZ: 2, opacity: 1, opacitySpeed: 0},
		{rotationX: -0.55, rotationSpeedX: 2.2, rotationY: 0, rotationSpeedY: 0, rotationZ: 0, rotationSpeedZ: 0, positionX: 0, positionSpeedX: 0, positionY: 2, positionSpeedY: 0, positionZ: 1.80, positionSpeedZ: 0.8, opacity: 1, opacitySpeed: 0},
		{rotationX: -0.1, rotationSpeedX: 2.2, rotationY: 0, rotationSpeedY: 0, rotationZ: 0, rotationSpeedZ: 0, positionX: 0, positionSpeedX: 0, positionY: 2, positionSpeedY: 0, positionZ: 1.46, positionSpeedZ: 1.36, opacity: 1, opacitySpeed: 0}
    ]
};

let cameraPhasesSecond = {
    phase: 0,
    phases: [
	    {rotationX: 0.015, rotationSpeedX: 2.03, rotationY: 0.25, rotationSpeedY: 0.5, rotationZ: 0, rotationSpeedZ: 0, positionX: -0.239, positionSpeedX: 0.478, positionY: 1.87, positionSpeedY: 0.26, positionZ: 1.2, positionSpeedZ: 0.52, opacity: 1, opacitySpeed: 0}    
	]
};

// Manual animation phases for the capsule machine.
let capsuleMachinePhases = {
    phase: 0,
    phases: [
	    {scaleY: 12, scaleSpeedY: 26, rotationZ: 0.3, rotationSpeedZ: 0.8, positionY: 0.55, positionSpeedY: 1.12},
	    {scaleY: 5, scaleSpeedY: 16, rotationZ: 0, rotationSpeedZ: 0.8, positionY: 0, positionSpeedY: 1.12},
	    {scaleY: 10, scaleSpeedY: 12, rotationZ: -0.15, rotationSpeedZ: 0.3, positionY: 0.275, positionSpeedY: 0.554},
        {scaleY: 6.5, scaleSpeedY: 7.2, rotationZ: 0, rotationSpeedZ: 0.3, positionY: 0, positionSpeedY: 0.554},
        {scaleY: 4, scaleSpeedY: 5.2, rotationZ: 0, rotationSpeedZ: 0, positionY: 0, positionSpeedY: 0},
        {scaleY: 14, scaleSpeedY: 22, rotationZ: 0, rotationSpeedZ: 0, positionY: 0, positionSpeedY: 0},
        {scaleY: 8, scaleSpeedY: 14, rotationZ: 0, rotationSpeedZ: 0, positionY: 0, positionSpeedY: 0}, 
        {scaleY: 10, scaleSpeedY: 6, rotationZ: 0, rotationSpeedZ: 0, positionY: 0, positionSpeedY: 0}
    ]
};

// Manual animation phases for the capsules and balls inside the machine (where they will be plopped).
let capsulesPhases = [
    {
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: 0.07700162190398448, positionSpeedX: 240, positionY: 1.182931777221432, positionSpeedY: 240, positionZ: -0.003786936462317447, positionSpeedZ: 240, rotationX: -0.012943307921760567, rotationSpeedX: 240, rotationY: 0.04489012582085278, rotationSpeedY: 240, rotationZ: 0.025231937726781877, rotationSpeedZ: 240}
		]
	},
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: -0.0880833218722649, positionSpeedX: 240, positionY: 1.3648495193919035, positionSpeedY: 240, positionZ: 0.0011595815013370541, positionSpeedZ: 240, rotationX: -0.002005311390316084, rotationSpeedX: 240, rotationY: 0.002051994722493295, rotationSpeedY: 240, rotationZ: 0.13465374982852477, rotationSpeedZ: 240}
	    ]
	},
	{
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: 0.09474988927200312, positionSpeedX: 240, positionY: 1.54, positionSpeedY: 240, positionZ: -0.004838136155882895, positionSpeedZ: 240, rotationX: -0.014331198012403998, rotationSpeedX: 240, rotationY: -0.004165025425326668, rotationSpeedY: 240, rotationZ: 1, rotationSpeedZ: 240}
		]
	},
	{
        phase: 0,
	    phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: -0.15, positionSpeedX: 240, positionY: 1.6, positionSpeedY: 240, positionZ: 0, positionSpeedZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: 0, rotationSpeedY: 240, rotationZ: 2, rotationSpeedZ: 240}
	    ]
	},
	{
        phase: 0,
	    phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: 0.01847247149177471, positionSpeedX: 240, positionY: 1.6611, positionSpeedY: 240, positionZ: -0.2118, positionSpeedZ: 240, rotationX: -0.5, rotationSpeedX: 240, rotationY: -0.6084831913451807, rotationSpeedY: 240, rotationZ: -0.5, rotationSpeedZ: 240}
		]
	},
	{
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: 0.22, positionSpeedX: 240, positionY: 1.7, positionSpeedY: 240, positionZ: 0, positionSpeedZ: 240, rotationX: -0.5, rotationSpeedX: 240, rotationY: 0, rotationSpeedY: 240, rotationZ: 0, rotationSpeedZ: 240}
		]
	},
	{
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: -0.1, positionSpeedX: 240, positionY: 2.3, positionSpeedY: 240, positionZ: 0, positionSpeedZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: 0, rotationSpeedY: 240, rotationZ: -1, rotationSpeedZ: 240}
		]
	},
	{
        phase: 0,
		phases: [
		    {scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: 0.02, positionSpeedX: 240, positionY: 1.7, positionSpeedY: 240, positionZ: 0.1, positionSpeedZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: 0, rotationSpeedY: 240, rotationZ: -1.8, rotationSpeedZ: 240}
		]
	},
    {
        phase: 0,
		phases: [  
            {scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: 0.1, positionSpeedX: 240, positionY: 1.95, positionSpeedY: 240, positionZ: 0, positionSpeedZ: 240, rotationX: -0.2, rotationSpeedX: 240, rotationY: 0, rotationSpeedY: 240, rotationZ: 0, rotationSpeedZ: 240}
	    ]
    },
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: -0.1, positionSpeedX: 240, positionY: 2.13, positionSpeedY: 240, positionZ: 0, positionSpeedZ: 240, rotationX: -2, rotationSpeedX: 240, rotationY: -6, rotationSpeedY: 240, rotationZ: 2, rotationSpeedZ: 240}
	    ]
    },
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: 0.1, positionSpeedX: 240, positionY: 2.2, positionSpeedY: 240, positionZ: 0, positionSpeedZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: -6, rotationSpeedY: 240, rotationZ: 2, rotationSpeedZ: 240}
	    ]
    },
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: 0.4, positionSpeedX: 240, positionY: 2, positionSpeedY: 240, positionZ: 0, positionSpeedZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: 0, rotationSpeedY: 240, rotationZ: -2, rotationSpeedZ: 240}
	    ]
    },
	{
        phase: 0,
		phases: [
			{scaleXYZ: 10, scaleSpeedXYZ: 240, positionX: 0.2, positionSpeedX: 240, positionY: 2, positionSpeedY: 240, positionZ: 0.2, positionSpeedZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: 0, rotationSpeedY: 240, rotationZ: -2, rotationSpeedZ: 240}
	    ]
    }
];

// Manual animation phases for all the star animations.
let starsPhases = [
    {
        phase: 0,
        phases: [
		    {scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 120, rotationY: 0.5, rotationSpeedY: 120, rotationZ: -1.5, rotationSpeedZ: 120, positionX: -1.5, positionSpeedX: 3.2, positionY: 3.5, positionSpeedY: 7.2, positionZ: -1, positionSpeedZ: 4, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 35, scaleSpeedXYZ: 240, rotationX: 0.5, rotationSpeedX: 0, rotationY: 0.5, rotationSpeedY: 0, rotationZ: -0.5, rotationSpeedZ: 0.8, positionX: -2, positionSpeedX: 0.4, positionY: 4, positionSpeedY: 0.4, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 1},
			{scaleXYZ: 0, scaleSpeedXYZ: 240, rotationX: 0, rotationSpeedX: 120, rotationY: 0, rotationSpeedY: 120, rotationZ: 0, rotationSpeedZ: 120, positionX: 0, positionSpeedX: 120, positionY: 1.5, positionSpeedY: 120, positionZ: 0.4, positionSpeedZ: 120, opacity: 1, opacitySpeed: 6},
			{scaleXYZ: 35, scaleSpeedXYZ: 40, rotationX: -1, rotationSpeedX: 0.8, rotationY: 0, rotationSpeedY: 0, rotationZ: 0, rotationSpeedZ: 0, positionX: 0, positionSpeedX: 0, positionY: 2, positionSpeedY: 0.4, positionZ: 0.4, positionSpeedZ: 0, opacity: 0, opacitySpeed: 1}
        ]
    },
    {
        phase: 0,
	    phases: [
			{scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 120, rotationY: 0.5, rotationSpeedY: 120, rotationZ: -1.5, rotationSpeedZ: 120, positionX: -1.3, positionSpeedX: 2.8, positionY: 3.1, positionSpeedY: 6.4, positionZ: -1, positionSpeedZ: 4, opacity: 1, opacitySpeed: 0}, 
			{scaleXYZ: 25, scaleSpeedXYZ: 240, rotationX: 0.5, rotationSpeedX: 0, rotationY: 0.5, rotationSpeedY: 0, rotationZ: -0.5, rotationSpeedZ: 0.8, positionX: -2, positionSpeedX: 0.4, positionY: 3.1, positionSpeedY: 0, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 1},
			{scaleXYZ: 0, scaleSpeedXYZ: 240, rotationX: 0, rotationSpeedX: 120, rotationY: 0, rotationSpeedY: 120, rotationZ: 0, rotationSpeedZ: 120, positionX: 0.3, positionSpeedX: 120, positionY: 1.5, positionSpeedY: 120, positionZ: 0.4, positionSpeedZ: 120, opacity: 1, opacitySpeed: 6},
		    {scaleXYZ: 25, scaleSpeedXYZ: 40, rotationX: -1, rotationSpeedX: 0.8, rotationY: 0, rotationSpeedY: 0, rotationZ: -0.5, rotationSpeedZ: 0.8, positionX: 0.7, positionSpeedX: 0.4, positionY: 2, positionSpeedY: 0.4, positionZ: 0.4, positionSpeedZ: 0, opacity: 0, opacitySpeed: 1}
	    ]
    },
	//
    {
		phase: 0,
		phases: [
			{scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 120, rotationY: 0.5, rotationSpeedY: 120, rotationZ: -1.5, rotationSpeedZ: 120, positionX: -1.61, positionSpeedX: 3.24, positionY: 2.7, positionSpeedY: 5.6, positionZ: -1, positionSpeedZ: 4, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 35, scaleSpeedXYZ: 240, rotationX: 0.5, rotationSpeedX: 0, rotationY: 0.5, rotationSpeedY: 0, rotationZ: -0.5, rotationSpeedZ: 0.8, positionX: -2, positionSpeedX: 0.4, positionY: 2, positionSpeedY: 0.4, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 1},
			{scaleXYZ: 0, scaleSpeedXYZ: 240, rotationX: 0, rotationSpeedX: 120, rotationY: 0, rotationSpeedY: 120, rotationZ: 0, rotationSpeedZ: 120, positionX: -0.3, positionSpeedX: 120, positionY: 1.5, positionSpeedY: 120, positionZ: 0.4, positionSpeedZ: 120, opacity: 1, opacitySpeed: 6},
			{scaleXYZ: 35, scaleSpeedXYZ: 40, rotationX: -1, rotationSpeedX: 0.8, rotationY: 0, rotationSpeedY: 0, rotationZ: -0.5, rotationSpeedZ: 0.8, positionX: -0.7, positionSpeedX: 0.4, positionY: 2, positionSpeedY: 0.4, positionZ: 0.4, positionSpeedZ: 0, opacity: 0, opacitySpeed: 1}
		]
	},
	{
		phase: 0,
		phases: [
			{scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 120, rotationY: -0.5, rotationSpeedY: 120, rotationZ: -0.5, rotationSpeedZ: 120, positionX: 1, positionSpeedX: 120, positionY: 2.55, positionSpeedY: 120, positionZ: -1, positionSpeedZ: 0.666, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 25, scaleSpeedXYZ: 240, rotationX: 0.5, rotationSpeedX: 0, rotationY: -0.5, rotationSpeedY: 0, rotationZ: -1.5, rotationSpeedZ: 0.8, positionX: 1.6, positionSpeedX: 0.4, positionY: 3, positionSpeedY: 0.4, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 1},
		]
    },
	{
		phase: 0,
		phases: [
		    {scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 120, rotationY: -0.5, rotationSpeedY: 120, rotationZ: -0.5, rotationSpeedZ: 120, positionX: .80, positionSpeedX: 120, positionY: 2.25, positionSpeedY: 120, positionZ: -1, positionSpeedZ: 0.666, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 15, scaleSpeedXYZ: 240, rotationX: 0.5, rotationSpeedX: 0, rotationY: -0.5, rotationSpeedY: 0, rotationZ: -1.5, rotationSpeedZ: 0.8, positionX: 1.6, positionSpeedX: 0.4, positionY: 2.25, positionSpeedY: 0, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 1},
		]
	},
	{
		phase: 0,
		phases: [
			{scaleXYZ: 0, scaleSpeedXYZ: 0, rotationX: 0.5, rotationSpeedX: 120, rotationY: -0.5, rotationSpeedY: 120, rotationZ: -0.5, rotationSpeedZ: 120, positionX: 1.07, positionSpeedX: 120, positionY: 1.95, positionSpeedY: 120, positionZ: -1, positionSpeedZ: 0.666, opacity: 1, opacitySpeed: 0},
			{scaleXYZ: 25, scaleSpeedXYZ: 240, rotationX: 0.5, rotationSpeedX: 0, rotationY: -0.5, rotationSpeedY: 0, rotationZ: -1.5, rotationSpeedZ: 0.8, positionX: 1.6, positionSpeedX: 0.4, positionY: 1.5, positionSpeedY: 0.4, positionZ: -1, positionSpeedZ: 0, opacity: 0, opacitySpeed: 1},
		]
	},
];

let starsSecondUsePhases = [
	{
		phase: 0,
		phases: [
			{scaleXYZ: 12, scaleSpeedXYZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: -0.3, rotationSpeedY: 240, rotationZ: 0, rotationSpeedZ: 240, positionX: -0.58, positionSpeedX: 240, positionY: 1.7, positionSpeedY: 240, positionZ: 0.13, positionSpeedZ: 240, opacity: 1, opacitySpeed: 0},
		]
	},
	{
		phase: 0,
		phases: [
		    {scaleXYZ: 25, scaleSpeedXYZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: -0.3, rotationSpeedY: 240, rotationZ: 0, rotationSpeedZ: 240, positionX: -0.58, positionSpeedX: 240, positionY: 2, positionSpeedY: 240, positionZ: 0.13, positionSpeedZ: 240, opacity: 1, opacitySpeed: 0},
		]
    },
	{
	    phase: 0,
		phases: [
			{scaleXYZ: 16, scaleSpeedXYZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: -0.3, rotationSpeedY: 240, rotationZ: 0, rotationSpeedZ: 240, positionX: -0.73, positionSpeedX: 240, positionY: 1.8, positionSpeedY: 240, positionZ: 0.13, positionSpeedZ: 240, opacity: 1, opacitySpeed: 0},
	    ]
	},
	{
		phase: 0,
		phases: [
			{scaleXYZ: 12, scaleSpeedXYZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: 0.3, rotationSpeedY: 240, rotationZ: 0, rotationSpeedZ: 240, positionX: 0.58, positionSpeedX: 240, positionY: 1.7, positionSpeedY: 240, positionZ: 0.13, positionSpeedZ: 240, opacity: 1, opacitySpeed: 0},
		]
	},
	{
	    phase: 0,
		phases: [
			{scaleXYZ: 25, scaleSpeedXYZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: 0.3, rotationSpeedY: 240, rotationZ: 0, rotationSpeedZ: 240, positionX: 0.58, positionSpeedX: 240, positionY: 2, positionSpeedY: 240, positionZ: 0.13, positionSpeedZ: 240, opacity: 1, opacitySpeed: 0},
		]
    },
	{
		phase: 0,
		phases: [
			{scaleXYZ: 16, scaleSpeedXYZ: 240, rotationX: 0, rotationSpeedX: 240, rotationY: 0.3, rotationSpeedY: 240, rotationZ: 0, rotationSpeedZ: 240, positionX: 0.73, positionSpeedX: 240, positionY: 1.8, positionSpeedY: 240, positionZ: 0.13, positionSpeedZ: 240, opacity: 1, opacitySpeed: 0},
		]
	}
];

export { cameraPhases, cameraPhasesSecond, capsuleMachinePhases, capsulesPhases, starsPhases, starsSecondUsePhases };