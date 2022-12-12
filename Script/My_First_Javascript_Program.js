
// const date = new Date();
// console.log(date);
// for(let x = 0; x < 5; x++){
//     console.log("Hello, world!");
// }
const downloadFile = () => {
    const link = document.createElement("a");
    const content = document.querySelector("textarea").value;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "sample.txt";
    link.click();
    URL.revokeObjectURL(link.href);
 };