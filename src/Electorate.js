class Electorate {
  constructor (newName, theElection) {
    this.name = newName
    this.myElection = theElection
    this.myWinningCandidate = undefined
    this.totalValidVotes = 0
    this.allPartyVotes = []
    this.myWinningParty = undefined
  }
  addWinner (theWinnerName, thePartyName){
    this.myWinningParty = thePartyName
    let theWinner = undefined
    /// assumption all wining candidates ARE members of a Party
    let theParty = this.myElection.findParty(thePartyName)
    theWinner = theParty.findListCandidate(theWinnerName)
    /// NOT a list Candidate
    if (! theWinner) {
    theWinner = theParty.addElectorateOnlyMP(theWinnerName, this)
    }
    else { 
    theWinner.setElectorate(this)
    theParty.setElectorateMP(theWinner)
    }
    this.myWinningCandidate = theWinner
  }
  
  addPartyVotes(...allPartyVotes){
    this.allPartyVotes = allPartyVotes
    let sum = 0
    for (let i=0; i<this.allPartyVotes.length-1; i+=1){
      let votes = this.allPartyVotes[i]
      this.myElection.addPartyVote(i, votes)
      sum += votes
    }
    this.totalValidVotes = sum
  }
  
  toString(){
    let name = this.name
    let total = this.totalValidVotes 
    //let winnerParty = this.myWinningCandidate.myParty
    //let partyIndex = this.myElection.allMyParties.indexOf(winnerParty)
    //let votes = this.allPartyVotes[partyIndex]
    let invalid = this.allPartyVotes[this.allPartyVotes.length-1]
    let result = `${name} ${total}(${invalid})`
    return result
  }
}