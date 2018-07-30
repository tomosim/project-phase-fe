addJourney = async () => {
    const newJourney = {
      mode: this.state.mode,
      route: this.state.route,
      belongs_to: this.props.user._id
    }
    const journey = await api.createJourney(newJourney)
    this.setState({
      currentJourney: journey
    })
  }

  logRoute = async () => {
    const { latitude, longitude } = await this.getLatLong();
    const currentCoors = {latitude, longitude, timestamp: Date.now()}
    console.log(latitude, longitude)
    this.setState({
      route: [...this.state.route, currentCoors]
    })
  } 