class Election {
  constructor (newYear) {
    this.year = newYear
    this.totalVotes = 0
    this.allMyParties = []
    this.allMyElectorates = []
    this.allMyCandidates = []
    this.eligbleParties = []
    this.voteQuotients = []
  }
  
  addParty (newPartyName) {
    let newParty = new Party(newPartyName, this)
    this.allMyParties.push(newParty)
    return newParty
  }
  
  
  findParty(targetPartyName){
    return this.allMyParties.find(aParty => aParty.name === targetPartyName)
  }

  addCandidate(theCandidate){
    this.allMyCandidates.push(theCandidate)
  }
  
  findCandidate(targetCandidateName){
    return this.allMyCandidates.find(aCandidate => aCandidate.name === targetCandidateName)
  }
  
  addElectorate (theElectorateName) {
    let newElectorate = new Electorate(theElectorateName, this)
    this.allMyElectorates.push(newElectorate)
    return newElectorate
  }

  findElectorate(targetElectorateName){
    return this.allMyElectorates.find(anElectorate => anElectorate.name === targetElectorateName)
  }
  
  addPartyVote(i, n)  {
    let theParty = this.allMyParties[i]
    theParty.addToPartyVote(n)
  }
  
  toString(){
    return this.year
  }
  
  getParties() {
    let result = ''
    for (let aParty of this.allMyParties){
      result += aParty + View.NEWLINE()
    }
    return result
  }
  
  getPartyLists() {
    let result = ''
    for (let aParty of this.allMyParties){
      if (aParty.hasList()) {
        result += aParty + View.NEWLINE()
        result += aParty.getListCandidates() + View.NEWLINE()
      }
    }
    return result
  }
  getElectorates() {
    let result = ''
    for (let anElectorate of this.allMyElectorates) {
      result += anElectorate + View.NEWLINE()
    }
    return result
  }
  allocateSeats() {
    this.getTotalVotes()
    for (let aParty of this.allMyParties) {
      aParty.calVotePercentage()
      if (aParty.votePercentage >= 5 || (aParty.votePercentage <5 && aParty.allMyElectorateMPs.length >=1)) {
        this.eligbleParties.push(aParty)
      }
    }
    for (let aParty of this.eligbleParties) {
      for(let i = 1; i <= 121; i += 2) {
        let calNumber = aParty.votes / i
        let tempMap = new Map()
        tempMap.set(aParty.name, calNumber)
        this.voteQuotients.push(tempMap)
      }
    }
    this.voteQuotients.sort(function(a, b) {
      return b.values().next().value - a.values().next().value
    })
    for (let i = 0; i < 120; i++ ) {
      let tempMap = this.voteQuotients[i]
      for (let eligbleParty of this.eligbleParties) {
          if (tempMap.keys().next().value == eligbleParty.name) {
            eligbleParty.totalSeats++
            break
          }
        }
    }
    for (let eligbleParty of this.eligbleParties) {
      eligbleParty.checkOverhung()
      eligbleParty.getListMPs()
    }
  }
  getTotalVotes() {
    for (let i = 0; i < this.allMyParties.length; i++) {
      this.totalVotes += this.allMyParties[i].votes
    }
  }
  getAll () {
    this.allocateSeats()
    let result = 'Election '+ this + View.NEWLINE()
    
    result += '*PARTIES*' + View.NEWLINE()
    result += this.getParties() + View.NEWLINE()
      
    result += '***PARTY LISTS***' + View.NEWLINE()
    result += this.getPartyLists() + View.NEWLINE()
    
    return result
  }

}