import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select, { SelectInstance } from 'react-select';
import * as yup from 'yup';
import { RootState } from '../../store';
import { saveUncontrolledForm } from '../../store/formSlice';
import styles from './UncontrolledForm.module.scss';

interface CountryOption {
  label: string;
  value: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup
    .number()
    .required('Age is required')
    .min(0, 'Age must be a non-negative number'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref('email'), undefined], 'Emails must match')
    .required('Confirm Email is required'),
  password: yup
    .string()
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('Terms and Conditions are required'),
  picture: yup.mixed().required('Picture is required'),
  country: yup
    .object()
    .shape({
      label: yup.string().required('Country is required'),
      value: yup.string().required('Country is required'),
    })
    .required('Country is required'),
});

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.form.countries);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const confirmEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<SelectInstance<CountryOption>>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value ? parseInt(ageRef.current.value) : 0,
      email: emailRef.current?.value || '',
      confirmEmail: confirmEmailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      picture: pictureRef.current?.files || null,
      country: countryRef.current?.getValue()[0] || '',
    };

    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          dispatch(
            saveUncontrolledForm({
              ...data,
              picture: base64String,
            })
          );
          navigate('/');
        };

        if (data.picture && data.picture[0]) {
          reader.readAsDataURL(data.picture[0]);
        } else {
          dispatch(
            saveUncontrolledForm({
              ...data,
              picture: data.picture ? '' : undefined,
            })
          );
          navigate('/');
        }
      })
      .catch((err) => {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      });
  };

  const handleTermsChange = () => {
    setIsTermsChecked(termsRef.current?.checked || false);
  };

  return (
    <div className={styles.form}>
      <h2>Form using uncontrolled components</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            className={styles.inputValid}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            ref={ageRef}
            className={styles.inputValid}
          />
          {errors.age && <p className={styles.error}>{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className={styles.inputValid}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="confirmEmail">Confirm Email:</label>
          <input
            type="email"
            id="confirmEmail"
            ref={confirmEmailRef}
            className={styles.inputValid}
          />
          {errors.confirmEmail && (
            <p className={styles.error}>{errors.confirmEmail}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className={styles.inputValid}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            className={styles.inputValid}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" ref={genderRef} className={styles.inputValid}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className={styles.error}>{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="terms">Accept Terms and Conditions:</label>
          <input
            type="checkbox"
            id="terms"
            ref={termsRef}
            className={styles.inputValid}
            onChange={handleTermsChange}
          />
          {errors.terms && <p className={styles.error}>{errors.terms}</p>}
        </div>
        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            ref={pictureRef}
            accept=".png, .jpeg, .jpg"
            className={styles.inputValid}
          />
          {errors.picture && <p className={styles.error}>{errors.picture}</p>}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <Select
            ref={countryRef}
            options={countries}
            className={errors.country ? styles.inputError : styles.inputValid}
          />
          {errors.country && <p className={styles.error}>{errors.country}</p>}
        </div>
        <button type="submit" disabled={!isTermsChecked}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
