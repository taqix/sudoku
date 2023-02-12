<script>
  import logo from "./assets/svelte.png";
  import "./lib/Tailwind.css";
  import Board from "./components/Board.svelte";
  let selectedFileO = false;
  let dataJSON
  function selected() {
    try {
      const selectedFile = document.getElementById("inputFile").files[0];
      selectedFile.text().then((res) => {
        let json = JSON.parse(res);
        dataJSON = json
        if(json.solution == undefined || json.board == undefined){
          alert("Wybierz poprawny plik")
        }
        else{
          selectedFileO = true
          document.getElementById("inputFile").disabled = true
        }
      });
    } catch (error) {}
  }
</script>

<section>
  <div id="takeFile" class="flex w-screen justify-center">
    <input type="file" id="inputFile" on:input={selected} />
  </div>

  <div
    id="sudokuTitle"
    class="flex w-screen justify-center border-b-4 drop-shadow-2xl"
  >
    <h1 class="font-sans text-4xl font-bold">Sudoku</h1>
  </div>
  {#if selectedFileO}
    <Board data={dataJSON}/>
  {/if}
</section>
