import {writable} from 'svelte/store'
const arrayOfWinNotWriteable = []

for(let i = 0; i < 9; i++) {
     arrayOfWinNotWriteable[i] = []
     for(let j=0;j<9;j++){
       arrayOfWinNotWriteable[i][j] = false
     }
}
export const writableArrayOfIsWin = writable(arrayOfWinNotWriteable)