import { Component } from 'react';
import CardList from '../CardList/CardList';

class Main extends Component {
  state = {};
  render() {
    return (
      <main>
        <section>Search</section>
        <section>
          <CardList />
        </section>
      </main>
    );
  }
}

export default Main;
