const computeResult = (output: string) => {
    //筛选出 数字
    let numArr: string[] = output.split(/[+-]/)
    // 筛选出 运算符
    let symArr: string = output.replace(/[^+-]/g, '')

    let sum: number = Number(numArr[0])
    for (let i = 0; i < numArr.length; i++){
        let symOne = symArr.charAt(i)
        let num = Number(numArr[i + 1])
        if(symOne === '+'){
            sum += num
        }else if (symOne === '-'){
            sum -= num
        }
    }
    return sum.toString()
}

const generateOutput = (text: string, output: string)=> {
    switch (text) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (output === '0') {
                return text;
            } else {
                return output + text;
            }
        case '.':
            if (output.indexOf('.') >= 0) {
                if(output.lastIndexOf('+')  > output.lastIndexOf('-')) {
                    const _output = output.substring(output.lastIndexOf('+'))
                    if(_output.indexOf('.') >= 0){
                        return output
                    }
                }else if(output.lastIndexOf('+')  < output.lastIndexOf('-')){
                    const _output = output.substring(output.lastIndexOf('-'))
                    if(_output.indexOf('.') >= 0){
                        return output
                    }
                }else{
                    // 即没有 + 号，也没有 - 号，但是已经有 .
                    return output;
                }

            }
            return output + '.';
        case'+':
            if (output[output.length - 1] === '+' || output[output.length - 1] === '-') return output;
            return output + '+';
        case'-':
            if (output[output.length - 1] === '+' || output[output.length - 1] === '-') return output;
            return output + '-';
        case'删除':
            if (output.length === 1) {
                return '';
            } else {
                return output.slice(0, -1) || '';
            }
        case '清零':
            return '';
        case '=':
            return computeResult(output) + '';
        default:
            return '';
    }
}

export default generateOutput