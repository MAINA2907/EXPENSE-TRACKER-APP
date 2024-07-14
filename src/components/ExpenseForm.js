// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const ExpenseForm = () => {
//     const initialValues = {
//         description: '',
//         amount: '',
//         paymode: '',
//         category: ''
//     };

//     const validationSchema = Yup.object({
//         description: Yup.string().required('Description is required'),
//         amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
//         paymode: Yup.string().required('Payment mode is required'),
//         category: Yup.string().required('Category is required')
//     });

//     const handleSubmit = async (values, { resetForm }) => {
//         try {
//             const response = await fetch('http://localhost:5000/expenses', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(values),
//             });
            
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             console.log(data.message);
//             resetForm();
//         } catch (error) {
//             console.error('There was an error adding the expense!', error);
//         }
//     };

//     return (
//         <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//         >
//             {({ isSubmitting }) => (
//                 <Form>
//                     <div>
//                         <label>Description:</label>
//                         <Field type="text" name="description" />
//                         <ErrorMessage name="description" component="div" className="error" />
//                     </div>
//                     <div>
//                         <label>Amount:</label>
//                         <Field type="number" name="amount" />
//                         <ErrorMessage name="amount" component="div" className="error" />
//                     </div>
//                     <div>
//                         <label>Payment Mode:</label>
//                         <Field type="text" name="paymode" />
//                         <ErrorMessage name="paymode" component="div" className="error" />
//                     </div>
//                     <div>
//                         <label>Category:</label>
//                         <Field type="text" name="category" />
//                         <ErrorMessage name="category" component="div" className="error" />
//                     </div>
//                     <button type="submit" disabled={isSubmitting}>
//                         Add Expense
//                     </button>
//                 </Form>
//             )}
//         </Formik>
//     );
// };

// export default ExpenseForm;