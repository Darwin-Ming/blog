// 测试 Array.property.reduce 方法
// reduce(callback: (accumulator[T], index, array) => T, initialValue[T])
// 着重理解 reduce 回调函数的第一个参数 accumulator

// 当 reduce 设置初始值的时候，accumulator === 初始值，并且 currentElement 从第0个元素开始.

// 当 reduce 没有设置初始值时，accumulator === 第0个元素，currentElement 从第1个元素开始

// accumulator 的值都是 reduce 回调函数的返回值

const arr = [
    {
        name: 'darwin',
    },
    {
        name: 'mark',
    },
    {
        name: 'stone',
    },
];

const hasInitialParameterResult = arr.reduce(
    (accumulator, currentElement, index) => {
        console.log('current index : ', index);
        return `${accumulator}${currentElement.name} `;
    },
    'has initial parameter result : ',
);
console.log(hasInitialParameterResult);

console.log();

const noInitialParameterResult = arr.reduce(
    (accumulator, currentElement, index) => {
        console.log('current index : ', index);
        if (index === 1) {
            return `${accumulator.name} ${currentElement.name}`;
        }
        return `${accumulator} ${currentElement.name} `;
    },
);
console.log('has initial parameter result : ', noInitialParameterResult);
