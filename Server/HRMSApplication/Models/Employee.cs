namespace HRMSApplication.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Lastname { get; set; }
        public int ReportingManagerID { get; set; }
        public ICollection<Employee> Reportings { get; set; }
        public DateTime JoiningDate { get; set; }
        public int Salary { get; set; }
    }
}
