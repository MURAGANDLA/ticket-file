import React, { useState } from "react";
import { Search, Ticket, ChevronLeft, ChevronRight, X } from "lucide-react";
import Button from "./components/ui/button";
import Input from "./components/ui/input";
import Card from "./components/ui/card";
import Dropdown from "./components/ui/dropdown";
import "./components/ui/TicketDashboard.css";

const initialTickets = [
  { id: "Ticket# 2023-CS123", title: "How to deposit money to my portal?", priority: "Normal", status: "New", user: "Ajay", time: "1:45 PM", description: "To deposit money into your portal, go to the 'Deposit' section, select your preferred payment method, enter the amount, and follow the on-screen instructions to complete the transaction." },
  { id: "Ticket# 2023-CS124", title: "Payment issues with my bank account", priority: "High", status: "On-Going", user: "Nani", time: "8:45 AM", description: "If you're facing payment issues with your bank account, please check if your bank supports online transactions, ensure sufficient balance, and verify if any restrictions are applied. If the issue persists, contact your bank or our support team." },
  { id: "Ticket# 2023-CS125", title: "Login issue on mobile app", priority: "Low", status: "Resolved", user: "Ravi", time: "12:15 PM", description: "If you're facing login issues, please reset your password using the 'Forgot Password' option or try reinstalling the app. If the problem persists, contact our support team." }
];

const TicketDashboard = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("Select Priority");
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(null);
  const [newTicket, setNewTicket] = useState({ title: "", user: "", priority: "Normal", status: "New", description: "" });

  const ticketsPerPage = 3;

  const filteredTickets = tickets.filter(ticket => (
    (filter === "All" || ticket.status === filter) &&
    (priority === "Select Priority" || ticket.priority === priority) &&
    (ticket.title.toLowerCase().includes(search.toLowerCase()) || ticket.id.toLowerCase().includes(search.toLowerCase()))
  ));

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const displayedTickets = filteredTickets.slice((currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage);

  const handleNewTicket = () => {
    if (!newTicket.title || !newTicket.user || !newTicket.description) {
      alert("Please fill all fields");
      return;
    }

    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const newId = `Ticket# 2023-CS${randomNumber}`;

    const newTicketData = {
      id: newId,
      ...newTicket,
      time: new Date().toLocaleTimeString(),
    };

    setTickets([...tickets, newTicketData]);
    setShowNewTicketModal(false);
    setNewTicket({ title: "", user: "", priority: "Normal", status: "New", description: "" });
  };

  return (
    <div className="ticket-dashboard">
      <div className="top-container">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <Input placeholder="Search by Ticket ID or Title..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />
        </div>
        <div className="right-actions">
          <Dropdown options={["Select Priority", "High", "Normal", "Low"]} selected={priority} setSelected={setPriority} />
          <Button className="new-ticket-button" onClick={() => setShowNewTicketModal(true)}>+ New Ticket</Button>
        </div>
      </div>

      <div className="filters-container">
        {["All", "New", "On-Going", "Resolved"].map(status => (
          <Button key={status} className={`filter-button ${filter === status ? "active" : ""}`} onClick={() => setFilter(status)}>
            {status}
          </Button>
        ))}
      </div>

      <div className="ticket-list">
        {displayedTickets.map(ticket => (
          <Card key={ticket.id} className="ticket-card">
            <div className="ticket-header">
              <div className="ticket-id">
                <Ticket className="ticket-icon" size={20} />
                {ticket.id}
              </div>
              <span className="ticket-time">Posted at {ticket.time}</span>
            </div>
            <div className="ticket-details">
              <p className="ticket-title">{ticket.title}</p>
            </div>
            <div className="ticket-footer">
              <p>{ticket.user}</p>
              <button className="open-ticket" onClick={() => setShowTicketModal(ticket)}>Open Ticket</button>
            </div>
          </Card>
        ))}
      </div>

      <div className="pagination">
        <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}><ChevronLeft /></Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}><ChevronRight /></Button>
      </div>

      {showTicketModal && (
        <div className="modal">
          <div className="modal-content">
            <X className="close-modal" size={24} onClick={() => setShowTicketModal(null)} />
            <h2>{showTicketModal.title}</h2>
            <p><strong>User:</strong> {showTicketModal.user}</p>
            <p><strong>Priority:</strong> {showTicketModal.priority}</p>
            <p><strong>Description:</strong> {showTicketModal.description}</p>
          </div>
        </div>
      )}

      {showNewTicketModal && (
        <div className="modal">
          <div className="modal-content">
            <X className="close-modal" size={24} onClick={() => setShowNewTicketModal(false)} />
            <h2>Create New Ticket</h2>
            <Input placeholder="Title" value={newTicket.title} onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })} />
            <Input placeholder="User Name" value={newTicket.user} onChange={(e) => setNewTicket({ ...newTicket, user: e.target.value })} />
            <Dropdown options={["High", "Normal", "Low"]} selected={newTicket.priority} setSelected={(value) => setNewTicket({ ...newTicket, priority: value })} />
            <textarea placeholder="Describe your issue" value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} />
            <Button onClick={handleNewTicket}>Submit Ticket</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDashboard;
