// import React, { useEffect, useState } from "react";
// import { getMessages } from "../../services/user";
// import TruncatedText from "../../components/Global/TruncatedText";
// import { Link } from "react-router-dom";

// const MessagesDropdown = () => {
//   const [messages, setMessages] = useState([]);

//   const getMessagesHandler = async () => {
//     const fetchedMessages = await getMessages();
//     setMessages(fetchedMessages);
//   };

//   useEffect(() => {
//     getMessagesHandler();
//   }, []);

//   return (
//     <></>
//     // <div className="dropdown">
//     //   {messages.length > 0 ? (
//     //     <span
//     //       className="position-absolute  badge rounded-pill bg-purple"
//     //       style={{ top: "-4px", right: "0px", fontSize: "10px" }}
//     //     >
//     //       {messages.length > 9 ? "9+" : messages.length}
//     //     </span>
//     //   ) : null}

//     //   <button
//     //     className="btn btn-sm text-white"
//     //     type="button"
//     //     id="dropdownMenuButton1"
//     //     data-bs-toggle="dropdown"
//     //     aria-expanded="false"
//     //   >
//     //     <i className="fas fa-comment"></i>
//     //   </button>
//     //   <ul
//     //     className="dropdown-menu dropdown-menu-end dropd position-absolute px-2 py-2"
//     //     aria-labelledby="dropdownMenuButton1"
//     //     style={{ width: "300px" }}
//     //   >
//     //     {messages.length > 0 ? (
//     //       <>
//     //         {messages.map((message) => (
//     //           <li key={message.message} className="dropdown-item">
//     //             <div className="row">
//     //               <div className="col-2 border-2 border-end border-secondary ">
//     //                 <div className="d-flex justify-content-center align-items-center h-100">
//     //                   <i className="fas fa-user"></i>
//     //                 </div>
//     //               </div>
//     //               <div className="col-10">
//     //                 <Link
//     //                   to={`/profile/${message.user_first_id}/${message.username}`}
//     //                   className="dropdown-item"
//     //                 >
//     //                   <p
//     //                     className="text-muted"
//     //                     style={{ fontSize: "13px", margin: "0px" }}
//     //                   >
//     //                     {message.username}
//     //                   </p>
//     //                   <p style={{ fontSize: "15px", margin: "0px" }}>
//     //                     <TruncatedText
//     //                       text={message.message}
//     //                       minimunLength={25}
//     //                     />
//     //                   </p>
//     //                 </Link>
//     //               </div>
//     //             </div>
//     //           </li>
//     //         ))}
//     //       </>
//     //     ) : (
//     //       <li className="dropdown-item">No messages</li>
//     //     )}
//     //   </ul>
//     // </div>
//   );
// };

// export default MessagesDropdown;
