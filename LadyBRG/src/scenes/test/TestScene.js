import ColorHelper from '../../helpers/ColorHelper.js';

export class TestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TestScene' });
    }

    create() {
        console.log('Starting tests...');

        const addColorTests = [
            { current: 0,   added: 180, expected: 90 },
            { current: 0,   added: 90,  expected: 45 },
            { current: 0,   added: 270, expected: 135                                                                                 },
            { current: 300, added: 70,  expected: 5 },
            { current: 10,  added: 350, expected: 180 },
            { current: 180, added: 270, expected: 225 },
            { current: 90,  added: 90,  expected: 90 },
            { current: 270, added: 180, expected: 45 },
            { current: 350, added: 20,  expected: 5 },
            { current: 0,   added: 0,   expected: 0 }
        ];

        const getColorToTargetTests = [
            { current: 0, target: 90,  expected: 180, direction: 1 },
            { current: 0, target: 45,  expected: 90,  direction: 1 },
            { current: 0, target: 315, expected: 270, direction: -1 },
            { current: 300, target: 335, expected: 10,  direction: 1 },
            { current: 10,  target: 0,   expected: 350, direction: -1 },
            { current: 180, target: 225, expected: 270, direction: 1 },
            { current: 90,  target: 135, expected: 180, direction: 1 },
            { current: 270, target: 225, expected: 180, direction: -1 },
            { current: 350, target: 5,   expected: 20,  direction: 1 },
            { current: 0,   target: 0,   expected: 0,   direction: 1 },
            { current: 144, target: 24,  expected: 264, direction: -1 }
        ];

        let passed = 0;
        let testLength = 0;

        for (let i = 0; i < addColorTests.length; i++) {
            testLength++;
            const test = addColorTests[i];
            const result = ColorHelper.addColors(test.current, test.added);
            const isPass = result == test.expected;

            console.log(
                `Test ${i + 1}: addColors(${test.current}, ${test.added}) → ${result} Expected ${test.expected} ${isPass ? '✅' : '❌'}`
            );

            if (isPass) passed++;
        }

        for (let i = 0; i < getColorToTargetTests.length; i++) {
            testLength++;
            const test = getColorToTargetTests[i];
            const result = ColorHelper.getColorToTarget(test.current, test.target);

            const isPass =
                result.hue === test.expected &&
                result.direction === test.direction;

            console.log(
                `GetColorToTarget Test ${i + 1}: current=${test.current}, target=${test.target} → hue=${result.hue}, direction=${result.direction} | Expected hue=${test.expected}, direction=${test.direction} ${isPass ? '✅' : '❌'}`
            );

            if (isPass) passed++;
        }


        console.log(`\n✅ Passed ${passed}/${testLength} tests`);
    }
}