<script>
// @ts-nocheck

  import { text } from "svelte/internal";

  // @ts-nocheck
  import { onMount } from "svelte";
  import { Confetti } from "svelte-confetti";
  import { writableArrayOfIsWin } from "../stores/store.js";
  import "../lib/Tailwind.css";
  
  let solution = [];
  let board = [];
    
  export let data
  const allInputs = []
  let endGameClose = false
  function checkInput(test, e) {
    if(e.keyCode == 39){
      const nowInd = allInputs.indexOf(e.target);
      allInputs[nowInd+1].focus()
      return
    }
    else if(e.keyCode == 37){
      const nowInd = allInputs.indexOf(e.target);
      allInputs[nowInd-1].focus()
      return
    }
    const x = test.id[0];
    const y = test.id[2];
    if (solution[x][y] == test.value) {
      test.disabled = true;
      test.style.backgroundColor = "green";
      $writableArrayOfIsWin[x][y] = true;
    } else {
      test.style.backgroundColor = "red";
    }
    console.log($writableArrayOfIsWin);
    // console.log(e.keyCode);
    // // console.log(test.value.length)
    // console.log(test.id);
  }
  onMount(() => {
    console.log(data.cos)
    solution = data.solution
    board = data.board
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if(board[i][j] != '-') { 
          $writableArrayOfIsWin[i][j] = true
          
        }
        else{
          const inp = document.getElementById(i+"-"+j)
          allInputs.push(inp)
        }
        
      }
    }
    
  });
  function toggle() {
    endGameClose = !endGameClose;
  }
  function allEqual() {
    let returnedCheck = false
    for(let i = 0; i < 9; i++) {
      for(let j = 0;j<9;j++){
        if($writableArrayOfIsWin[i][j] == false){
          returnedCheck = false
          break;
        }
        else{
          returnedCheck = true
        }
      }
    }
    console.log($writableArrayOfIsWin);
    return returnedCheck
  }
  function solve(){
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          $writableArrayOfIsWin[i][j] = true
          document.getElementById(i+"-"+j).value = solution[i][j]
          document.getElementById(i+"-"+j).disabled = true
      }
    }
  }
</script>

<section>
  <div id="menu" class="flex w-screen justify-center">
    <button class="border-2 border-sky-500 p-2 rounded-md mt-4" on:click={solve}>Rozwiąż zestaw</button>
  </div>
  <div class="w-screen flex flex-col mt-5">
    {#each board as row, i}
      <div class="flex justify-center">
        {#each row as column, j}
          {#if column == "-"}
            <!-- svelte-ignore missing-declaration -->
            <input
              type="number"
              class="inputSudoku"
              id={i + "-" + j}
              on:keyup={(e) => {
                checkInput(event.target, e);
              }}
            />
          {:else}
            <input
              type="number"
              value={column}
              class="inputSudoku"
              disabled
              id={i + "-" + j}
            />
          {/if}

          <!-- {column} -->
        {/each}
      </div>
    {/each}
  </div>
  {#if allEqual() && $writableArrayOfIsWin[0][0] != false && !endGameClose}<div
    class="h-screen w-screen flex content-center justify-center flex-col z-10 absolute top-0 bg-sky-500/70"
  >
    <div
      class="w-fit h-fit self-center py-2.5 px-2.5 border-2 border-sky-500 rounded-lg "
    >
      <div
        class="text-center  subpixel-antialiased font-sans text-2xl font-medium tracking-normal"
      >
        Wygrana
      </div>
      
      <button class="text-center subpixel-antialiased font-sans text-2xl font-medium justify-self-center tracking-normal w-full border rounded-xl border-red-700  mt-3 transition  ease-in hover:scale-110 hover:bg-red-700 hover:text-white" on:click={toggle}>Zamknij</button>
      <Confetti size={10} infinite={true} x={[-3,3]} y={[-1,1.5]}/>
      
    </div>
    
  </div>
{/if}
</section>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .inputSudoku {
    width: 40px;
    margin: 0 0 2px 2px;
    height: 40px;
    text-align: center;
    border: 1px solid grey;
  }
  section{
    max-width: 434px;
  }
</style>
