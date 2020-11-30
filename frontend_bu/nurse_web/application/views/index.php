<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0">Nurse</h4>

                        <!--                        <div class="page-title-right">
                                                    <ol class="breadcrumb m-0">
                                                        <li class="breadcrumb-item">
                                                            <a href="javascript: void(0);">Minible</a>
                                                        </li>
                                                        <li class="breadcrumb-item active">Dashboard</li>
                                                    </ol>
                                                </div>-->

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <div class="col-md-6 col-xl-3">
                    <div class="card">
                        <div class="card-body">

                            <div>
                                <p class="text-muted mb-0">Total Case</p>
                                <h4 class="mb-1 mt-1"><span data-plugin="counterup">10</span></h4>

                            </div>
                            <!--<p class="text-muted mt-3 mb-0"><span class="text-success mr-1"><i class="mdi mdi-arrow-up-bold ml-1"></i>2.65%</span> since last week</p>-->
                        </div>
                    </div>
                </div> <!-- end col-->

                <div class="col-md-6 col-xl-3">
                    <div class="card">
                        <div class="card-body">

                            <div>
                                <p class="text-muted mb-0">Total Patient</p>
                                <h4 class="mb-1 mt-1"><span data-plugin="counterup">3</span></h4>

                            </div>
                            <!--<p class="text-muted mt-3 mb-0"><span class="text-success mr-1"><i class="mdi mdi-arrow-up-bold ml-1"></i>2.65%</span> since last week</p>-->
                        </div>
                    </div>
                </div> <!-- end col-->
            </div>


            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <div style="margin-bottom: 20px;" align="center">
                                <a>
                                    <button type="button" class="btn btn-success btn-rounded waves-effect waves-light" data-toggle="modal" data-target="#lg_modal" style="width: 200px;">
                                        <i class="fas fa-plus"></i>&nbsp;&nbsp;Admit
                                    </button>
                                </a>    
                            </div>
                            <ul class="nav nav-pills" role="tablist">
                                <li class="nav-item waves-effect waves-light">
                                    <a class="nav-link active" data-toggle="tab" href="#navpills-home" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                        <span class="d-none d-sm-block">Admit</span> 
                                    </a>
                                </li>
                                <li class="nav-item waves-effect waves-light">
                                    <a class="nav-link" data-toggle="tab" href="#navpills-profile" role="tab">
                                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                        <span class="d-none d-sm-block">Treat</span> 
                                    </a>
                                </li>
                                <li class="nav-item waves-effect waves-light">
                                    <a class="nav-link" data-toggle="tab" href="#navpills-messages" role="tab">
                                        <span class="d-block d-sm-none"><i class="far fa-envelope"></i></span>
                                        <span class="d-none d-sm-block">History</span>   
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content p-3 text-muted">
                                <div class="tab-pane active" id="navpills-home" role="tabpanel">
                                    <div style="margin: 10px;">
                                        <h4 class="card-title">Admit list table</h4>
                                        <p class="card-title-desc">
            <!--                                Create responsive tables by wrapping any <code>.table</code> in <code>.table-responsive</code>
                                            to make them scroll horizontally on small devices (under 768px).-->
                                        </p>

                                        <div class="table-responsive">
                                            <table class="table mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Severity</th>
                                                        <th>Date</th>
                                                        <th>Symptom</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Testname 01</td>
                                                        <td>5</td>
                                                        <td>2020-11-25 16:00:00</td>
                                                        <td>Have a high fever</td>
                                                        <td><i class="fas fa-check"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Testname 02</td>
                                                        <td>5</td>
                                                        <td>2020-11-25 16:00:00</td>
                                                        <td>Have a high fever</td>
                                                        <td><i class="fas fa-check"></i></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="navpills-profile" role="tabpanel">
                                    <p class="mb-0">
                                    <table class="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Severity</th>
                                                <th>Date</th>
                                                <th>Symptom</th>
                                                <th>Doctor</th>
                                                <th>Status</th>
                                                <th>Treat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Testname 01</td>
                                                <td>5</td>
                                                <td>2020-11-25 16:00:00</td>
                                                <td>Have a high fever</td>
                                                <td>Doctor01</td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td>
                                                    <button type="button" class="btn btn-danger  btn-sm waves-effect waves-light">
                                                        <i class="fas fa-user-edit"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Testname 02</td>
                                                <td>5</td>
                                                <td>2020-11-25 16:00:00</td>
                                                <td>Have a high fever</td>
                                                <td>Doctor01</td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td>
                                                    <button type="button" class="btn btn-danger  btn-sm waves-effect waves-light">
                                                        <i class="fas fa-user-edit"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </p>
                                </div>

                                <div class="tab-pane" id="navpills-messages" role="tabpanel">
                                    <table class="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>HN ID</th>
                                                <th>Symptom</th>
                                                <th>History</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Testname 01</td>
                                                <td>1</td>
                                                <td>Have a high fever</td>
                                                <td>
                                                    <button type="button" class="btn btn-light btn-sm waves-effect waves-light">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Testname 02</td>
                                                <td>2</td>
                                                <td>Have a high fever</td>
                                                <td>
                                                    <button type="button" class="btn btn-light btn-sm waves-effect waves-light">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>


        </div> <!-- container-fluid -->
    </div>
    <!-- End Page-content -->


    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <script>document.write(new Date().getFullYear())</script> © Minible.
                </div>
                <div class="col-sm-6">
                    <div class="text-sm-right d-none d-sm-block">
                        Crafted with <i class="mdi mdi-heart text-danger"></i> by <a href="https://themesbrand.com/" target="_blank" class="text-reset">Themesbrand</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</div>
<!-- end main content-->

<div class="modal fade bs-example-modal-lg" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;" id="lg_modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title mt-0" id="myLargeModalLabel">New Admit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="form_admit" method="post">
                    <div class="" style="padding: 15px; ">
                        <div class="form-group row">
                            <label for="example-datetime-local-input" 
                                   class="col-md-2 col-form-label">Patient</label>
                            <div class="col-md-10">
                                <select class="form-control select2" style="width: 100%;" name="hn" onchange="select_patient(this);">
                                    <option>Select Patient</option>
                                    <?php
                                    $_where = array('i_status' => 1);
                                    $_select = array('id, s_first_name, s_last_name, s_idcard, i_hn');
                                    $patien = $this->Main_model->fetch_data('', '', TBL_PATIEN, $_where, $_select);
                                    foreach ($patien as $key => $val) {
                                        ?>
                                        <option value="<?= $val->i_hn; ?>"><?= $val->s_first_name . " " . $val->s_last_name . " : " . $val->s_idcard; ?></option>
                                    <?php }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div id="load_patient_data" style="width: 100%;"></div>
                        </div>
                    </div>
                    <div class="" style="padding: 15px;">
                        <div class="form-group row">
                            <label for="d_date" class="col-md-2 col-form-label">Date and time</label>
                            <div class="col-md-10">
                                <!--<input class="form-control" type="datetime-local" value="<?= date(); ?>" name="date" id="d_date">-->
                                <input class="form-control" type="datetime-local" value="2019-08-19T13:45:00" id="example-datetime-local-input">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 col-form-label">Level Severity</label>
                            <div class="col-md-10"> 
                                <input class="form-control" type="number" value="" name="level" >
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">How to get hospital</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="h_t_hospital">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">Come by</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="come_by">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">LMP</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="lmp">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">Symptoms</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="symptoms">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">Current symptoms / first symptoms / trauma</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="all_symptoms">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">Glasgow coma scale (GCS)</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="all_symptoms">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">E (Eye opening)</label>
                            <div class="col-md-10">
                                <input class="form-control" type="number" value="" name="e">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">V (Verbal response)</label>
                            <div class="col-md-10">
                                <input class="form-control" type="number" value="" name="v">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">M (Motor response)</label>
                            <div class="col-md-10">
                                <input class="form-control" type="number" value="" name="m">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">BT</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="bt">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">BP</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="bp">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">PR</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="pr">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">O2sat</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value="" name="o2sat">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-text-input" class="col-md-2 col-form-label">Pain Score (PS)</label>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value=""name="ps">
                            </div>
                        </div>
                    </div>
                    <div style="padding: 15px;">
                        <div class="form-group row">
                            <button type="submit" class="btn btn-primary btn-lg btn-block waves-effect waves-light mb-1">Submit data</button>
                        </div>
                    </div>
                </form>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>