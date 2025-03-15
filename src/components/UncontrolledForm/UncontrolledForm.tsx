import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { saveUncontrolledForm } from '../../store/formSlice';
import styles from './UncontrolledForm.module.scss';

interface IFormInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture?: FileList;
  country: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup
    .number()
    .min(0, 'Age must be a non-negative number')
    .required('Age is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
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
  picture: yup
    .mixed<FileList>()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value || value.length === 0) return true;
      return value[0].size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value || value.length === 0) return true;
      return ['image/png', 'image/jpeg'].includes(value[0].type);
    }),
  country: yup.string().required('Country is required'),
});

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log('Form submitted:', data);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      console.log('Base64 String:', base64String);
      dispatch(saveUncontrolledForm({ ...data, picture: base64String }));
      console.log('Form submitted with Base64 picture:', {
        ...data,
        picture: base64String,
      });
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
  };

  return (
    <div className={styles.form}>
      <h2>Form using uncontrolled components</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={errors.name ? styles.inputError : styles.inputValid}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            {...register('age')}
            className={errors.age ? styles.inputError : styles.inputValid}
          />
          {errors.age && <p className={styles.error}>{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={errors.email ? styles.inputError : styles.inputValid}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className={errors.password ? styles.inputError : styles.inputValid}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className={
              errors.confirmPassword ? styles.inputError : styles.inputValid
            }
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            {...register('gender')}
            className={errors.gender ? styles.inputError : styles.inputValid}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className={styles.error}>{errors.gender.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="terms">Accept Terms and Conditions:</label>
          <input
            type="checkbox"
            id="terms"
            {...register('terms')}
            className={errors.terms ? styles.inputError : styles.inputValid}
          />
          {errors.terms && (
            <p className={styles.error}>{errors.terms.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            {...register('picture')}
            accept=".png, .jpeg, .jpg"
            className={errors.picture ? styles.inputError : styles.inputValid}
          />
          {errors.picture && (
            <p className={styles.error}>{errors.picture.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            {...register('country')}
            className={errors.country ? styles.inputError : styles.inputValid}
          />
          {errors.country && (
            <p className={styles.error}>{errors.country.message}</p>
          )}
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
