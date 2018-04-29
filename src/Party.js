class Party{
  constructor (newName, theElection) {
    this.name = newName
    this.votes = 0
    this.myElection = theElection
    this.allMyCandidates = []
    this.allMyListCandidates = []
    this.allMyElectorateMPs = []
    this.votePercentage = 0
    this.totalSeats = 0
    this.listSeats = 0
  }
  
  addListCandidates (...allListCandidateNames){
    for (let aNewCandidateName of allListCandidateNames){
      let newCandidate = new Candidate(aNewCandidateName, this, this.allMyListCandidates.length + 1)
      this.allMyListCandidates.push(newCandidate)
      this.allMyCandidates.push(newCandidate)
      this.myElection.addCandidate(newCandidate)
    }
  }
  
  findListCandidate(targetCandidateName){
    return this.allMyCandidates.find(aCandidate => aCandidate.name === targetCandidateName)
  }

  addElectorateOnlyMP(newCandidateName, theElectorate){
      let newCandidate = new Candidate(newCandidateName, this, undefined)
      newCandidate.myElectorate = theElectorate
      this.allMyElectorateMPs.push(newCandidate)
      this.allMyCandidates.push(newCandidate)
      this.myElection.addCandidate(newCandidate)
      return newCandidate
  }
  
  setElectorateMP(theCandidate){
      this.allMyElectorateMPs.push(theCandidate)
  }
  
  addToPartyVote( n ) {
    this.votes += n
  }
  
  calVotePercentage() {
    this.votePercentage = this.votes / this.myElection.totalVotes *100
  }
  checkOverhung() {
    if (this.totalSeats == 0 && this.allMyElectorateMPs.length !==0) {
    this.totalSeats = this.allMyElectorateMPs.length 
    }
    this.listSeats = this.totalSeats - this.allMyElectorateMPs.length
  }
  getListMPs() {
    let selectedCandidates = 0
    if (this.listSeats > 0) {
      for (let aCandidate of this.allMyListCandidates) {
        if (!aCandidate.myElectorate) {
          aCandidate.hasListSeat = true
          selectedCandidates++
          if (selectedCandidates == this.listSeats) {
            break;
          }
        }
      }
    }
  }
  toString() {
    let name = this.name
    let votes = this.votes
    let result = `${name} ${votes}` + '  <strong>TotalSeats:</strong>' + this.totalSeats + '   <strong>ElectotateSeats:</strong>' +
    this.allMyElectorateMPs.length + '  <strong>ListSeats:</strong>'  + this.listSeats
    return result
  }
  
  hasList(){
    return this.allMyListCandidates.length > 0
  }
  
  getListCandidates() {
    let result = ''
    let n = 1
    for (let aCandidate of this.allMyListCandidates) {
      result += n + ' ' + aCandidate + View.NEWLINE()
      n += 1
    }
    return result
  }
}