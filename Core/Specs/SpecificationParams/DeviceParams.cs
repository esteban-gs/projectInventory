namespace Core.Specs.SpecificationParams
{
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
        public int Skip { get => (Page - 1) * _recordsPerPage; }

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
