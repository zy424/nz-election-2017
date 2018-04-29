class Candidate{
  constructor(newName, theParty, aListPosition){
    this.name = newName
    this.listPosition = aListPosition
    this.myParty = theParty
    this.myElectorate = undefined
    this.hasListSeat = false
  }
  
  setElectorate(theElectorate){
    this.myElectorate = theElectorate
  }
 
  toString(){
    let result = this.name
    if (this.myElectorate) {
      result += ' <strong>MP for ' + this.myElectorate.name +'</strong>'
    }
    if (this.hasListSeat) {
      result += ' <strong>MP for List Seats</strong>'
    }
    return result
  }
  
}