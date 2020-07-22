using Swashbuckle.AspNetCore.Annotations;
using System.Runtime.InteropServices.WindowsRuntime;

namespace Core.Specs.SpecificationParams
{
    [SwaggerTag("Create, read, update and delete Products")]
    public class DeviceParams
    {
        private const int MaxRecordsPerPage = 50;

        public int Page { get; set; } = 1;

        private int _recordsPerPage = 10;

        public int RecordsPerPage
        {
            get => _recordsPerPage;
            set => _recordsPerPage = (value > MaxRecordsPerPage) ? MaxRecordsPerPage : value;
        }

        public string Sort { get; set; }
        public int? CategoryId { get; set; }
        public int? MakerId { get; set; }

        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }

    }
}
