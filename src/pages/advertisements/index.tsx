import {NextPage} from "next";
// import React from "react";
// import {useFindNurses} from "../../hooks/api/nurse";
// import DataTable from "react-data-table-component";

// const Advertisement: NextPage = ({}) => {
//     const {data: advertisements} = useFindNurses();
//     let advertisementNumber = 0;
//     if (advertisements) {
//         advertisementNumber = advertisements.length
//     }

//     const columns = [
//         {
//             name: 'Noms',
//             selector: row => row.firstName + ' ' + row.lastName,
//             sortable: true,
//         },
//         {
//             name: 'Téléphone',
//             selector: 'phoneNumber',
//             sortable: true,
//         },
//         {
//             name: 'Email',
//             selector: 'email',
//             sortable: true,
//         },
//         {
//             name: 'DOB',
//             selector: 'dob',
//             sortable: false,
//         },
//     ];

//     return (
//         <section className='p-8'>
//             <div className='space-y-8'>
//                 <div className='w-full border-x border-t rounded-lg'>
//                     <DataTable
//                         title={advertisementNumber + " Annonces"}
//                         columns={columns}
//                         data={advertisements}
//                         pagination
//                         responsive={true}

//                         highlightOnHover
//                     />
//                 </div>
//             </div>
//         </section>
//     )
// };

// export default Advertisement;