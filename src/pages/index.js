import Arrow from '../assets/icon-arrow.svg';
import { useState, useEffect } from 'react';
import {
  Container,
  SearchSection,
  SearchInfos,
  MapContainer,
} from '../styles/indexStyled';

export default function Home() {
  const test = true;
  const [loading, setLoading] = useState(false);
  const [results, setResult] = useState({});

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    async function getInitialData() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=${apiKey}`
        );
        const data = await response.json();

        if (response.status !== 200) throw new Error();

        setResult(data);
      } catch (err) {
        toast.error('An error occurred while searching your IP!');
      } finally {
        setLoading(false);
      }
    }
    getInitialData();
  }, []);

  async function handleSubmit() {}

  return (
    <Container>
      <SearchSection result={true}>
        <h2>IP Address Tracker</h2>

        <div>
          <input type="text" placeholder="Search" />
          <button>
            <Arrow />
          </button>
        </div>

        {results?.location && (
          <SearchInfos>
            <ul>
              <li>
                <div>
                  <strong>IP Address Tracker</strong>
                  <p>{results.ip}</p>
                </div>
              </li>

              <li>
                <div>
                  <strong>Location</strong>
                  <p>
                    {`${results.location.city}, ${results.location.country}`}
                    <br />
                    {results.location.region}
                  </p>
                </div>
              </li>

              <li>
                <div>
                  <strong>Timezone</strong>
                  <p> {results.location.timezone}</p>
                </div>
              </li>

              <li>
                <div>
                  <strong>ISP</strong>
                  <p>{results.isp}</p>
                </div>
              </li>
            </ul>
          </SearchInfos>
        )}
      </SearchSection>

      <MapContainer />
    </Container>
  );
}
