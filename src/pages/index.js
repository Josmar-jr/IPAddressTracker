import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';

import Arrow from '../assets/icon-arrow.svg';

import Loader from '../components/Loader';
const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

import {
  Container,
  SearchSection,
  SearchInfos,
  MapContainer,
} from '../styles/indexStyled';

export default function Home() {
  const [ipAddress, setIpAddress] = useState('');
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

  async function handleSubmit() {
    if (!ipAddress) return;

    try {
      setLoading(true);

      if (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          ipAddress
        )
      ) {
        const response = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`
        );

        const data = await response.json();
        if (response.status !== 200) throw new Error();

        setResult(data);
      } else {
        const response = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${ipAddress}`
        );

        const data = await response.json();
        if (response.status !== 200) throw new Error();

        setResult(data);
      }
    } catch (err) {
      toast.error(
        'An error occurred while search for this IP or domain! Please try again'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    toast.warn('Please disable ADBlock for the application to work normally', {
      autoClose: '10000',
    });
  }, []);

  const defaultPosition = [-23.55052, -46.633306];

  return (
    <Container>
      <SearchSection result={true}>
        <h2>IP Address Tracker</h2>

        <div>
          <input
            type="text"
            value={ipAddress}
            onChange={({ target }) => setIpAddress(target.value)}
            placeholder="Search"
          />
          <button disable={!!loading} onClick={handleSubmit}>
            {loading ? <Loader /> : <Arrow />}
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

      <MapContainer loading={loading}>
        <Map
          defaultPosition={defaultPosition}
          location={
            results.location
              ? [results.location.lat, results.location.lng]
              : defaultPosition
          }
        />
      </MapContainer>
    </Container>
  );
}
