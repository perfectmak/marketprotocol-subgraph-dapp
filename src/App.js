import React, { Component } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Grid } from '@material-ui/core';
import { scroller, Element } from 'react-scroll';

import './App.css';
import Introduction from './components/Introduction';
import {
  SecondSection,
  ThirdSection,
  FourthSection,
  FifthSection
} from './components/Sections';
import { Section } from './components/Section';
import Footer from './components/Footer';

const queryEndpoint =
  'https://api.thegraph.com/subgraphs/name/perfectmak/marketprotocol-kovan';

const client = new ApolloClient({
  uri: queryEndpoint,
  cache: new InMemoryCache()
});

const scrollToProps = {
  duration: 800,
  delay: 50,
  smooth: true
};

const scrollTo = section => {
  scroller.scrollTo(section, scrollToProps);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  gotoQuickStartGuide = () => {
    window.location.href = 'https://thegraph.com/docs/quick-start';
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Grid container direction="column">
            <Grid item>
              <Introduction startDemo={() => scrollTo('SecondSection')} />
              <Element name="SecondSection">
                <Section
                  secondary
                  onNextClicked={() => scrollTo('ThirdSection')}
                >
                  <SecondSection />
                </Section>
              </Element>
              <Element name="ThirdSection">
                <Section onNextClicked={() => scrollTo('FourthSection')}>
                  <ThirdSection />
                </Section>
              </Element>
              <Element name="FourthSection">
                <Section secondary onNextClicked={() => scrollTo('FifthSection')}>
                  <FourthSection />
                </Section>
              </Element>
              <Element name="FifthSection">
                <Section nextText="Proceed to final Section" onNextClicked={() => scrollTo('SixthSection')}>
                  <FifthSection />
                </Section>
              </Element>
              <Element name="SixthSection">
                <Section secondary showNext={false}>
                  <Footer />
                </Section>
              </Element>
            </Grid>
          </Grid>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
