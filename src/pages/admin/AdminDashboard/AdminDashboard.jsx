import React, {useState , useEffect} from 'react'
import axios from 'axios';
import './AdminDashboard.css'

import PageTitle from '../AdditionalSections/PageTitle/PageTitle'
import Card from '../AdditionalSections/Card/Card';
import Report from '../AdditionalSections/Report/REport';
import RecentSales from '../AdditionalSections/RecentSales/RecentSales';

const AdminDashboard = () => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/cards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <main id='main' className='main'>
      <PageTitle page="Dashboard"/>

      <section className='dashboard section'>
        <div className="row">
          {
            cards && cards.length > 0 &&
            cards.map(card => <Card key={card._id} card={card}/>)
          }
          <div className="col-12">
            <Report/>
          </div>
          <div className="col-12">
            <RecentSales/>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminDashboard
