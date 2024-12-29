export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-10">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  