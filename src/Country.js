class Country {
    constructor () {
     this.allElections = []
    }

    addElection(newElection) {
       this.allElections.push(newElection)
    }

    getAll () {
        let result = ''
        for (let i = 0; i<this.allElections.length; i++) {
            result += this.allElections[i].getAll()
        }
        result += '<strong>COMPARING 2014 AND 2017 ELECTION BY ELECTORATE</strong>'
        result += this.showComparingResutls() +'</br>'
        result += '</br>' + '<strong>MORE BLUE OR RED FOR EACH ELECTORATE</strong>'
        result += this.blueOrRed()
        return result
    }

    showComparingResutls() {
        let result = ''
        result += View.STARTTABLE() + View.STARTTR()
        result += View.STARTTD()
        result += 'Electorate'
        result += View.ENDTD()
        result += View.STARTTD()
        result += '2014'
        result += View.ENDTD()
        result += View.STARTTD()
        result += '2017'
        result += View.ENDTD()
        result += View.STARTTD()
        result += 'Status'
        result += View.ENDTD()
        result +=  View.ENDTR()
        for (let i = 0; i < this.allElections[0].allMyElectorates.length; i++) {
            result += View.STARTTR()
            result += View.STARTTD()
            result += this.allElections[0].allMyElectorates[i].name
            result += View.ENDTD()
            result += View.STARTTD()
            result += this.allElections[0].allMyElectorates[i].myWinningParty
            result += View.ENDTD()
            result += View.STARTTD()
            result += this.allElections[1].allMyElectorates[i].myWinningParty
            result += View.ENDTD()
            let status = 'Changed'
            if (this.allElections[0].allMyElectorates[i].myWinningParty.toLowerCase() == this.allElections[1].allMyElectorates[i].myWinningParty.toLowerCase()) {
                status = 'Stayed'
            }
            result += View.STARTTD()
            result += status
            result += View.ENDTD()
            result += View.ENDTR()
        }

        result += View.ENDTABLE()
        return result
    }

        

    blueOrRed() {
        let result = ''
        result += View.STARTTABLE() + View.STARTTR()
        result += View.STARTTD()
        result += 'Electorate'
        result += View.ENDTD()
        result += View.STARTTD()
        result += '2014Blue-Votes'
        result += View.ENDTD()
        result += View.STARTTD()
        result += '2017Blue-Votes'
        result += View.ENDTD()
        result += View.STARTTD()
        result += 'Blue Status'
        result += View.ENDTD()
        result += View.STARTTD()
        result += '2014Red-Votes'
        result += View.ENDTD()
        result += View.STARTTD()
        result += '2017Red-Votes'
        result += View.ENDTD()
        result += View.STARTTD()
        result += 'Red Status'
        result += View.ENDTD()
        result +=  View.ENDTR()
        for (let i = 0; i < this.allElections[0].allMyElectorates.length; i++) {
            result += View.STARTTR()
            result += View.STARTTD()
            result += this.allElections[0].allMyElectorates[i].name
            result += View.ENDTD()
            result += View.STARTTD()
            result += this.allElections[0].allMyElectorates[i].allPartyVotes[10]
            result += View.ENDTD()
            result += View.STARTTD()
            result += this.allElections[1].allMyElectorates[i].allPartyVotes[10]
            result += View.ENDTD()
            let status1 = ''
            if ((this.allElections[1].allMyElectorates[i].allPartyVotes[10] - this.allElections[0].allMyElectorates[i].allPartyVotes[10]) > 0 ) {
                status1 = 'Blue Up'
            } else {
                status1 = 'Blue Down'
            }
            result += View.STARTTD()
            result += status1
            result += View.ENDTD()
            result += View.STARTTD()
            result += this.allElections[0].allMyElectorates[i].allPartyVotes[8]
            result += View.ENDTD()
            result += View.STARTTD()
            result += this.allElections[1].allMyElectorates[i].allPartyVotes[7]
            result += View.ENDTD()
            let status2 = ''
            if ((this.allElections[1].allMyElectorates[i].allPartyVotes[7] - this.allElections[0].allMyElectorates[i].allPartyVotes[8]) > 0 ) {
                status2 = 'Red up'
            } else {
                status2 = 'Red Down'
            }
            result += View.STARTTD()
            result += status2
            result += View.ENDTD()
            result += View.ENDTR()
        }

        result += View.ENDTABLE()
        return result
    }
    
    renderBarCharts() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Parties');
        data.addColumn('number', 'Year 2014');
        data.addColumn('number', 'Year 2017');
        
       
        data.addRows([
            ['National Party' , this.allElections[0].eligbleParties[4].votePercentage,this.allElections[1].eligbleParties[3].votePercentage],
            ['Labour Party' , this.allElections[0].eligbleParties[2].votePercentage,this.allElections[1].eligbleParties[2].votePercentage],
            ['Green Party' , this.allElections[0].eligbleParties[1].votePercentage,this.allElections[1].eligbleParties[1].votePercentage],
            ['NZF Party' , this.allElections[0].eligbleParties[5].votePercentage,this.allElections[1].eligbleParties[4].votePercentage],
            ['ACT NZ Party' , this.allElections[0].eligbleParties[0].votePercentage,this.allElections[1].eligbleParties[0].votePercentage]
        ])
  
        var options = {
          title: 'New Zealand Election (2014 VS 2017)',
          focusTarget: 'category',
          colors: ['#9575cd', '#33ac71'],
          hAxis: {
            title: 'Parties',
            textStyle: {
              fontSize: 14,
              color: '#053061',
              bold: true,
              italic: false
            },
            titleTextStyle: {
              fontSize: 18,
              color: '#053061',
              bold: true,
              italic: false
            }
          },
          vAxis: {
            title: 'Percentage of Party Votes',
            textStyle: {
              fontSize: 18,
              color: '#67001f',
              bold: false,
              italic: false
            },
            titleTextStyle: {
              fontSize: 18,
              color: '#67001f',
              bold: true,
              italic: false
            }
          }
        };
  
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_overview'));
        chart.draw(data, options);
    }

    drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'National Party', 'Labour Party',  'NZF Party', 'Green Party'],
            ['2014', this.allElections[0].eligbleParties[4].totalSeats,
                     this.allElections[0].eligbleParties[2].totalSeats,
                     this.allElections[0].eligbleParties[5].totalSeats,
                     this.allElections[0].eligbleParties[1].totalSeats],
            ['2017', this.allElections[1].eligbleParties[3].totalSeats, 
                     this.allElections[1].eligbleParties[2].totalSeats,
                     this.allElections[1].eligbleParties[4].totalSeats,
                     this.allElections[1].eligbleParties[1].totalSeats]     
        ])
         
        var options = {
            colors: ['#0000ff', '#ff0000', '#000000', '#008000'],
            chart: {
                title: 'NZ ELECTION SEATS ALLOCATE',
                subtitle: 'National, Labour, Green, and NZF Seats: 2014VS2017',
            }
        }

        var chart = new google.charts.Bar(document.getElementById('chart_overview1'))
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}