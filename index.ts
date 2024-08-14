#! /usr/bin/env node
import inquirer from "inquirer";

type Ticket = {
  id: number;
  description: string;
  status: "Open" | "Closed";
};

let ticket: Ticket[] = [];

// Function to display main menu
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: ["Create Ticket", "View Tickets", "Close Ticket", "Exit"],
      },
    ])
    .then((answer) => {
      if (answer.action === "Create Ticket") {
        createTicket();
      } else if (answer.action === "View Tickets") {
        viewTickets();
      } else if (answer.action === "Close Ticket") {
        closeTicket();
      } else if (answer.action === "Exit") {
        console.log("\t\t\t\tExiting...");
        process.exit(0);
      }
    });
}

//  Function create a new ticket
function createTicket() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "description",
        message: "Enter ticket holder name:",
      },
    ])
    .then((answers) => {
      const newTicket: Ticket = {
        id: ticket.length + 1,
        description: answers.description,
        status: "Open",
      };
      ticket.push(newTicket);
      console.log("Ticket created successfully.");
      mainMenu();
    });
}

// Function to view all tickets
function viewTickets() {
  if (ticket.length === 0) {
    console.log("No tickets found.");
  } else {
    console.log("All Tickets:");
    ticket.forEach((ticket) =>
      console.log(
        `ID: ${ticket.id}, Description: ${ticket.description}, Status ${ticket.status}`
      )
    );
  }
  mainMenu();
}

// Function to closed
function closeTicket() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter ticket ID to close:",
      },
    ])
    .then((answers) => {
      const id = parseInt(answers.id);
      const ticketIndex = ticket.findIndex((ticket) => ticket.id === id);
      if (ticketIndex !== -1) {
        ticket[ticketIndex].status = "Closed";
        console.log(`Ticket ${id} closed successfully.`);
      } else {
        console.log("Ticket not found.");
      }
      mainMenu();
    });
}

console.log("\t\t\t\tWelcome to Tickets Management System!");
mainMenu();