import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const uncontrolledForm = useSelector(
    (state: RootState) => state.form.uncontrolledForm
  );
  const hookForm = useSelector((state: RootState) => state.form.hookForm);

  const [highlightUncontrolled, setHighlightUncontrolled] = useState(false);
  const [highlightHook, setHighlightHook] = useState(false);

  useEffect(() => {
    if (uncontrolledForm) {
      setHighlightUncontrolled(true);
      const timer = setTimeout(() => setHighlightUncontrolled(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [uncontrolledForm]);

  useEffect(() => {
    if (hookForm) {
      setHighlightHook(true);
      const timer = setTimeout(() => setHighlightHook(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hookForm]);

  useEffect(() => {
    if (uncontrolledForm && uncontrolledForm.picture) {
      console.log(
        'Uncontrolled Form Picture Base64:',
        uncontrolledForm.picture
      );
    }
  }, [uncontrolledForm]);

  useEffect(() => {
    if (hookForm && hookForm.picture) {
      console.log('Hook Form Picture Base64:', hookForm.picture);
    }
  }, [hookForm]);

  const decodeBase64Image = (base64String: string) => {
    console.log('Decoding Base64 Image:', base64String);
    return base64String.split(',')[1];
  };

  const getImageFormat = (base64String: string) => {
    if (base64String.startsWith('/9j/')) return 'jpeg';
    if (base64String.startsWith('iVBORw0KGgo')) return 'png';
    if (base64String.startsWith('R0lGOD')) return 'gif';
    if (base64String.startsWith('Qk')) return 'bmp';
    if (
      base64String.startsWith(
        'AAABAAEAEBAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEA'
      )
    )
      return 'ico';
    if (base64String.startsWith('PHN2Zy')) return 'svg+xml';
    if (base64String.startsWith('UklGR')) return 'webp';
    return 'jpeg';
  };

  return (
    <section className={styles.SectionHome}>
      <div className={styles.home}>
        <h2>Home Page</h2>
        <p>Welcome to the home page!</p>
        <div className={styles.items}>
          <div
            className={
              highlightUncontrolled ? styles.highlight : styles.SectionForm
            }
          >
            <h2>Uncontrolled Form Data</h2>
            {uncontrolledForm ? (
              <div className={styles.flexContainer}>
                {Object.entries(uncontrolledForm).map(([key, value]) => (
                  <div key={key} className={styles.flexItem}>
                    <strong className={styles.name}>{key}:</strong>
                    {key === 'picture' ? (
                      <img
                        src={`data:image/${getImageFormat(
                          value as string
                        )};base64,${decodeBase64Image(value as string)}`}
                        alt="Uploaded"
                        style={{ width: '100px', height: '100px' }}
                      />
                    ) : key === 'country' &&
                      value &&
                      typeof value === 'object' &&
                      'label' in value ? (
                      <pre>
                        {JSON.stringify(
                          (value as { label: string }).label,
                          null,
                          2
                        )}
                      </pre>
                    ) : (
                      <pre>{JSON.stringify(value, null, 2)}</pre>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No data submitted yet.</p>
            )}
          </div>

          <div
            className={highlightHook ? styles.highlight : styles.SectionForm}
          >
            <h2>Hook Form Data</h2>
            {hookForm ? (
              <div className={styles.flexContainer}>
                {Object.entries(hookForm).map(([key, value]) => (
                  <div key={key} className={styles.flexItem}>
                    <strong className={styles.name}>{key}:</strong>
                    {key === 'picture' ? (
                      <img
                        src={`data:image/${getImageFormat(
                          value as string
                        )};base64,${decodeBase64Image(value as string)}`}
                        alt="Uploaded"
                        style={{ width: '100px', height: '100px' }}
                      />
                    ) : key === 'country' &&
                      value &&
                      typeof value === 'object' &&
                      'label' in value ? (
                      <pre>
                        {JSON.stringify(
                          (value as { label: string }).label,
                          null,
                          2
                        )}
                      </pre>
                    ) : (
                      <pre>{JSON.stringify(value, null, 2)}</pre>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No data submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
