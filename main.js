const selectedOption = document.getElementById('optionA')
const sortedOption = document.getElementById('optionB')
const resultsList = document.getElementById('results')

selectedOption.addEventListener('click',()=>{
    binaryInsertionSorter('higher')
})

sortedOption.addEventListener('click',()=>{
    binaryInsertionSorter('lower')
})

//setting up initial variables
const exampleArray = [
    //add all desired choices in here!
    'KFC',
    'Popeyes',
    'Raising Canes',
    'Chik Fil A',
    'McDonalds',
    'Burger King',
    'Skyline Chili',
    'Denny\'s',
    'Smokes Poutine',
    'Liberty Shwarma',
    'My Roti Express',
    'Nook',
    'Culvers',
    'Greggs',
    'Max Burger'
]
const outputArray = []

const randomIndexFromArray = (array) =>{
    return Math.floor( Math.random() * array.length )
    //will output some random index from the array specified in the parameter
}

let currentSelection

// upper bound is 1 because the highest index the initial selection could be spliced at is 1, and the lowest is 0
let highestIndex = 1
let lowestIndex = 0
let comparatorIndex = 0

//add first item to output array
if(outputArray.length===0){
    const randomIndex = randomIndexFromArray(exampleArray)
    const [selected] = exampleArray.splice(randomIndex,1)
    outputArray.push(selected)
}

[currentSelection] = exampleArray.splice(randomIndexFromArray(exampleArray),1)
sortedSelection = outputArray[0]

console.log(currentSelection)

selectedOption.innerHTML = currentSelection
sortedOption.innerHTML = sortedSelection

const binaryInsertionSorter = (decision) => {

    switch(decision){
        case 'higher':
            console.log('higher')
            if(comparatorIndex===0){
                highestIndex = 0
                lowestIndex = 0
            }else{
                highestIndex = comparatorIndex
            }
            break;
        case 'lower':
            console.log('lower')
            lowestIndex = comparatorIndex+1
            break;
    }


    // console.log('highest: ', highestIndex)
    // console.log('lowest: ',lowestIndex)
    // console.log('comparatorindex: ',comparatorIndex)

    //check if further sorting is needed, if not then splice into the array at the appropriate point
    if(highestIndex===lowestIndex){
        outputArray.splice(highestIndex,0,currentSelection)
        highestIndex = outputArray.length
        lowestIndex = 0
        comparatorIndex = Math.floor((highestIndex+lowestIndex)/2)
        //if more items remain in the starting array
        if (exampleArray.length>0){
            [currentSelection] = exampleArray.splice(randomIndexFromArray(exampleArray),1)
            sortedSelection = outputArray[comparatorIndex]
        }else{
            //SORTING FINISHED
            console.log('SORTING COMPLETE: ',outputArray)
            selectedOption.style.display = 'none'
            sortedOption.style.display = 'none'

            outputArray.map((item)=>{
                resultsList.innerHTML += `<li>${item}</li>`
            })

        }
    }else{
        //if more sorting is needed:
        comparatorIndex = Math.floor((highestIndex+lowestIndex)/2)
        sortedSelection = outputArray[comparatorIndex]
        console.log('more sorting needed. New comparator: ', sortedSelection)

    }


    selectedOption.innerHTML = currentSelection
    sortedOption.innerHTML = sortedSelection
    return
}
