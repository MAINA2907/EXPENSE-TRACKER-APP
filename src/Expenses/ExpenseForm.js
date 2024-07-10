  import React from 'react';
  import { Formik, Form, Field, ErrorMessage } from 'formik';
  import * as Yup from 'yup';

  const ExpenseSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    description: Yup.string().required('Description is required'),
    amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
  });

  const ExpenseForm = ({ addExpense }) => {
    return (
      <Formik
        initialValues={{ date: '', description: '', amount: '' }}
        validationSchema={ExpenseSchema}
        onSubmit={(values, { resetForm }) => {
          addExpense(values);
          resetForm();
        }}
      >
        {() => (
          <Form>
            <div>
              <label>Date</label>
              <Field name="date" type="date" />
              <ErrorMessage name="date" component="div" />
            </div>
            <div>
              <label>Description</label>
              <Field name="description" type="text" />
              <ErrorMessage name="description" component="div" />
            </div>
            <div>
              <label>Amount</label>
              <Field name="amount" type="number" step="0.01" />
              <ErrorMessage name="amount" component="div" />
            </div>
            <button type="submit">Add Expense</button>
          </Form>
        )}
      </Formik>
    );
  };

  export default ExpenseForm;
