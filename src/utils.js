/**
 * Created by Hoang on 12/5/16.
 */
// export const throttle = (func, wait) => {
//     let context, args, prevArgs, argsChanged, result;
//     let previous = 0;
//     return function () {
//         let now, remaining;
//         if (wait) {
//             now = Date.now();
//             remaining = wait - (now - previous);
//         }
//         context = this;
//         // console.log("context:", context)
//         args = arguments;
//         console.log("arguments:", arguments)
//         argsChanged = JSON.stringify(args) !== JSON.stringify(prevArgs);
//         prevArgs = {...args};
//         if (argsChanged || (wait && remaining <= 0)) {
//                 // console.log("argsChanged:", argsChanged)
//             if (wait) {
//                 previous = now;
//                 // console.log("remaining:", remaining)
//             }
//             console.log("func:", func)
//             result = func.apply(context, args);
//             context = args = null;
//         }
//         return result;
//     };
// };

export const throttle = (func) => {
    let args, prevArgs
    return function () {
        // console.log("context:", context)
        args = arguments
        // console.log("arguments:", arguments)
        if (JSON.stringify(args) !== JSON.stringify(prevArgs)) {
            // console.log("func:", func)
            prevArgs = args
            func.apply(this, args);
            // context = args = null;
        }
    };
};